import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Stocks from "./pages/Stocks";
import Quote from "./pages/Quote";
import Header from "./components/Header";
import Error from "./pages/Error";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/quotes/:symbol" element={<Quote />}></Route>
        <Route path="/stocks" element={<Stocks />}></Route>
        <Route path="/error" element={<Error />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
