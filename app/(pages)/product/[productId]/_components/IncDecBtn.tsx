"use client";

import React from "react";
import "@/app/styles.css";

import type { RootState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQuantities,
  incrementQuantities,
} from "@/lib/Features/cartItems/cartItemsSlice";

function IncDecBtn() {
  const totalQuantities = useSelector(
    (state: RootState) => state.cartItems.totalQuantities,
  );
  const dispatch = useDispatch();

  return (
    <div className="container">
      <span className="minus" onClick={() => dispatch(decrementQuantities())}>
        <span></span>
      </span>
      <span className="num">{totalQuantities}</span>
      <span className="plus" onClick={() => dispatch(incrementQuantities())}>
        <span></span>
        <span></span>
      </span>
    </div>
  );
}

export default IncDecBtn;
