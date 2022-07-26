import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useChange } from "../api";
import { useNavigate } from "react-router-dom";

function StockCard(props) {
  return (
    <div className="card-text">
      <h6>{props.symbol}</h6>
      <h4>{props.change}</h4>
      <p>Max: {props.max}</p>
    </div>
  );
}
export default function StockCarousel() {
  const navigate = useNavigate();
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const { change } = useChange();

  return (
    <div>
      <Carousel className="stock-carousel" responsive={responsive}>
        {change.map((c) => (
          <button
            style={{
              backgroundColor: c.change < 0 ? "#F24452" : "#4BA67B",
              color: c.change < 0 ? "#F24452" : "#4BA67B",
            }}
            className="stock-card"
            onClick={(x) => {
              navigate(`/quotes/${c.symbol}`, {
                state: { selectedSymbol: c.symbol },
              });
            }}
          >
            <StockCard symbol={c.symbol} change={c.change} max={c.max} />
          </button>
        ))}
      </Carousel>
    </div>
  );
}
