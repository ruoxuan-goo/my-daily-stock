import hero from "../img/hero.png";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  return (
    <div className="hero">
      <div className="hero-text">
        <h1>Investing is for everyone.</h1>
        <h5>Get fast update on daily stock news. Anytime. Anywhere </h5>
        <Link to="/stocks">
          <button type="button" className="btn btn-outline-light btn-lg">
            Let's Get Started
          </button>
        </Link>
      </div>
      <div>
        <img src={hero} className="hero-img" alt="Hero img"></img>
      </div>
    </div>
  );
}
