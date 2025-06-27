import React, { useState,useContext } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid,fetchHoldings }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);

  const { closeBuyWindow } = useContext(GeneralContext);

  const handleBuyClick = () => {
    fetch("http://localhost:3002/newOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: uid,
        qty: stockQuantity,
        price: stockPrice,
        mode: "BUY",
      }),
    })
      .then((res) => res.json())
      .then(() => {
        fetchHoldings(); // ✅ Re-fetch holdings from backend
        closeBuyWindow(); // ✅ Close modal
      })
      .catch((err) => {
        console.error("Buy failed:", err);
      });
  };

  const handleCancelClick = () => {
    closeBuyWindow();
  };

  const marginRequired = parseFloat(stockQuantity) * parseFloat(stockPrice) || 0;
  // console.log("Qty:", stockQuantity, "Price:", stockPrice, "Margin:", marginRequired);

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹{(marginRequired || 0).toFixed(2)}</span>
        <div>
          <Link to="" className="btn btn-blue" onClick={handleBuyClick}>
            Buy
          </Link>
          <Link to="" className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
