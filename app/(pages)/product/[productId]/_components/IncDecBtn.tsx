"use client";

import React, { memo } from "react";
import "@/app/styles.css";
import { useStateContext } from "@/context/StateContext";

function IncDecBtn() {
  const { decrementQuantities, incrementQuantities, quantities } =
    useStateContext();

  return (
    <div className="container">
      <span className="minus" onClick={decrementQuantities}>
        <span></span>
      </span>
      <span className="num">{quantities}</span>
      <span className="plus" onClick={incrementQuantities}>
        <span></span>
        <span></span>
      </span>
    </div>
  );
}

export default IncDecBtn;
