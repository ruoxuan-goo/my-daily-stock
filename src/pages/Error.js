import React from "react";
import loading from "../img/loading.png";

export default function Error() {
  return (
    <div className="load-page">
      <img src={loading} className="loading-img" alt="Error image"></img>
      <h4>404..Opps!</h4>
    </div>
  );
}
