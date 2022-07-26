import { useEffect, useState } from "react";
const API_KEY = "5eb49566d020d9a874bb1c9ca820370a"; // main
//const API_KEY = "1f785a44909f5caa7f3b9e850b607741";

async function getStocks() {
  const url = `https://financialmodelingprep.com/api/v3/nasdaq_constituent?apikey=${API_KEY}`;
  let res = await fetch(url);
  let data = await res.json();

  return data.map((stock) => {
    return {
      symbol: stock.symbol,
      name: stock.name,
      sector: stock.sector,
    };
  });
}

async function getRandomSym() {
  let data = await getStocks();

  let symArr = [];
  data.map((s) => {
    symArr.push(s.symbol);
  });
  let top = [];

  for (let i = 0; i < 8; i++) {
    var rand = symArr[Math.floor(Math.random() * 16)];
    top.push(rand);
  }

  return { top };
}

async function getHistory(stockSymbol) {
  //console.log(stockSymbol);
  const url = `https://financialmodelingprep.com/api/v3/historical-price-full/${stockSymbol}?apikey=${API_KEY}`;
  let res = await fetch(url);
  let data = await res.json();
  let historical = data.historical;
  //console.log(historical);
  return historical.map((history) => {
    return {
      date: history.date,
      open: history.open,
      high: history.high,
      low: history.low,
      close: history.close,
      volume: history.volume,
      change: history.change,
    };
  });
}

async function getChange() {
  let ranSym = await getRandomSym();
  let ranStr = ranSym.top;

  const url = `https://financialmodelingprep.com/api/v3/stock-price-change/${ranStr}?apikey=${API_KEY}`;
  let res = await fetch(url);
  let data = await res.json();

  return data.map((stock) => {
    return {
      symbol: stock.symbol,
      ytd: stock.ytd,
      change: stock["1D"],
      max: stock.max,
    };
  });
}

export function useStocks() {
  const [loading, setLoading] = useState(true);
  const [stocks, setStocks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setStocks(await getStocks());
        setLoading(false);
      } catch (err) {
        setError(error);
      }
    })();
  }, []);

  return { loading, stocks, error };
}

export function useHistory(props) {
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setHistory(await getHistory(props.state.selectedSymbol));
        setLoading(false);
      } catch (err) {
        setError(error);
      }
    })();
  }, []);

  return { loading, history, error };
}

export function useChange() {
  const [loading, setLoading] = useState(true);
  const [change, setChange] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setChange(await getChange());
        setLoading(false);
      } catch (err) {
        setError(error);
      }
    })();
  }, []);

  return { loading, change, error };
}
