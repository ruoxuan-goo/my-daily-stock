import React from "react";
import loading from "../img/loading.png";

export default function Loading() {
  return (
    <div className="load-page">
      <img src={loading} className="loading-img" alt="Loading img"></img>
      <h4>Loading...</h4>
    </div>
  );
}
