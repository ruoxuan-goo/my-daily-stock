import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Badge } from "reactstrap";
import { useState, useEffect } from "react";
import { useStocks } from "../api";
import { useNavigate } from "react-router-dom";
import SearchBySymbol from "../components/SearchBySymbol";
import SearchBySector from "../components/SearchBySector";
import StockCarousel from "../components/StockCarousel";
import Footer from "../components/Footer";
import Loading from "./Loading";
import Error from "./Error";

export default function Stocks() {
  const navigate = useNavigate();
  const { loading, stocks, error } = useStocks();

  const columns = [
    { headerName: "Symbol", field: "symbol", flex: 1 },
    { headerName: "Name", field: "name", flex: 1 },
    { headerName: "Sector", field: "sector", flex: 1 },
  ];

  const defaultColDef = {
    sortable: true,
  };

  // Get symbol list for search symbol
  function getSymbolList() {
    let symbolOptions = [{ value: "", label: "" }];
    stocks.map((stock) => {
      symbolOptions.push({ value: stock.symbol, label: stock.symbol });
    });
    return symbolOptions;
  }

  //Get sector list for search sector
  function getSectorList() {
    let allSec = [];
    let sectorOptions = [{ value: "", label: "" }];

    stocks.map((stock) => {
      allSec.push(stock.sector);
    });
    allSec = [...new Set(allSec)].sort();

    allSec.map((stock) => {
      sectorOptions.push({ value: stock, label: stock });
    });
    return sectorOptions;
  }

  //const [rowData, setRowData] = useState([]); //set initial state for rowData
  const [symbol, setSymbol] = useState(); //handle change when search by symbol
  const [sector, setSector] = useState(); //handle change when search by sector
  const [rowData, setRowData] = useState([]);

  function filterStocks() {
    const filterList = stocks.filter((stock) => {
      if (symbol === "" && sector === "") {
        return stock;
      } else if (
        stock.symbol.includes(symbol) &&
        stock.sector.includes(sector)
      ) {
        return stock;
      }
    });
    setRowData(filterList);
  }

  // set default stocks data
  useEffect(() => {
    setRowData(stocks);
  }, [stocks]);

  // if a symbol or sector is selected, filter
  useEffect(() => {
    filterStocks();
  }, [symbol, sector]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  return (
    <div className="page">
      <div className="container">
        <h1>Stocks</h1>
        <h6>You may be interested with</h6>
        <StockCarousel />
        <div className="dropdown">
          <div>
            <h6>Search By Symbol</h6>
            <SearchBySymbol
              symbols={getSymbolList()}
              onChange={setSymbol}
              isSearchable={true}
              isClearable={true}
              placeholder={"Search symbol..."}
            />
          </div>
          <div>
            <h6>Search By Industry</h6>
            <SearchBySector
              sectors={getSectorList()}
              onChange={setSector}
              isSearchable={true}
              isClearable={true}
              placeholder={"Search sector..."}
            />
          </div>
        </div>
        <div
          className="ag-theme-alpine-dark"
          style={{ height: "500px", width: "100%" }}
        >
          <Badge color="success">{rowData.length} </Badge>Stocks Displayed
          <AgGridReact
            onRowClicked={(x) => {
              navigate(`/quotes/${x.data.symbol}`, {
                state: { selectedSymbol: x.data.symbol },
              });
            }}
            defaultColDef={defaultColDef}
            columnDefs={columns}
            rowData={rowData}
            pagination={true}
            paginationPageSize={9}
          />
        </div>
        <a href="https://site.financialmodelingprep.com/" target="_blank">
          <button type="button" className="btn btn-outline-light">
            Go To FMP API
          </button>
        </a>
      </div>
      <Footer />
    </div>
  );
}
