import { useLocation, Link } from "react-router-dom";
import { useHistory } from "../api";
import { useState, useEffect } from "react";
import { Badge } from "reactstrap";
import { AgGridReact } from "ag-grid-react";
import HistoryChart from "../components/Chart";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import Footer from "../components/Footer";
import Loading from "./Loading";
import Error from "./Error";

function mapData(data) {
  const mapDate = data.map((e) => e.date);
  const mapOpen = data.map((e) => e.open);
  const mapClose = data.map((e) => e.close);
  const mapHigh = data.map((e) => e.high);
  const mapLow = data.map((e) => e.low);
  const mapVolume = data.map((e) => e.volume);

  return {
    date: mapDate,
    close: mapClose,
    open: mapOpen,
    high: mapHigh,
    low: mapLow,
    volume: mapVolume,
  };
}

export default function Quote() {
  const location = useLocation();

  const { loading, history, error } = useHistory(location);
  const symbol = location.state.selectedSymbol;

  const columns = [
    { headerName: "Date", field: "date", flex: 1 },
    { headerName: "Open", field: "open", flex: 1 },
    { headerName: "High", field: "high", flex: 1 },
    { headerName: "Low", field: "low", flex: 1 },
    { headerName: "Close", field: "close", flex: 1 },
    { headerName: "Volume", field: "volume", flex: 1 },
    { headerName: "Change", field: "change", flex: 1 },
  ];

  const defaultColDef = {
    sortable: true,
  };

  const [rowData, setRowData] = useState([]);
  const [filterDate, setFilterDate] = useState("");

  const {
    date: date,
    close: close,
    open: open,
    high: high,
    low: low,
    volume: volume,
  } = mapData(rowData);

  function selectDate() {
    const dateList = history.filter((his) => {
      if (filterDate === "") {
        return his;
      } else {
        return new Date(his.date) >= new Date(filterDate);
      }
    });
    setRowData(dateList);
  }

  // set default price history
  useEffect(() => {
    setRowData(history);
  }, [history]);

  // if date is selected, filter price history
  useEffect(() => {
    selectDate();
  }, [filterDate]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  return (
    <div className="page">
      <div className="container">
        <h1>You are viewing: {symbol}</h1>
        <h6>View from date</h6>
        <input
          type="date"
          value={filterDate}
          onChange={(e) => {
            setFilterDate(e.target.value);
          }}
          id="date"
        />
        <div
          className="ag-theme-alpine-dark"
          style={{ height: "300px", width: "100%" }}
        >
          <Badge color="success">{rowData.length}</Badge> Stocks Displayed
          <AgGridReact
            columnDefs={columns}
            rowData={rowData}
            pagination={true}
            paginationPageSize={20}
            defaultColDef={defaultColDef}
          />
        </div>
        <HistoryChart
          date={date}
          open={open}
          close={close}
          high={high}
          low={low}
          volume={volume}
        />
        <Link to="/stocks">
          <button type="button" className="btn btn-outline-light">
            Back to Stocks
          </button>
        </Link>
      </div>

      <Footer />
    </div>
  );
}
