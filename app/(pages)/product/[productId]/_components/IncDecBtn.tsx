"use client";

import React from "react";
import "@/app/styles.css";

import type { RootState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import {
  decrement,
  increment,
} from "@/lib/Features/quantities/quantitiesSlice";

function IncDecBtn() {
  const totalQuantities = useSelector(
    (state: RootState) => state.quantities.totalQuantities,
  );
  const dispatch = useDispatch();

  return (
    <div className="container">
      <span className="minus" onClick={() => dispatch(decrement())}>
        <span></span>
      </span>
      <span className="num">{totalQuantities}</span>
      <span className="plus" onClick={() => dispatch(increment())}>
        <span></span>
        <span></span>
      </span>
    </div>
  );
}

export default IncDecBtn;
