"use client";

import { createSlice } from "@reduxjs/toolkit";

interface QuantitiesState {
  totalQuantities: number;
}

const initialState: QuantitiesState = {
  totalQuantities: 1,
};

const quantitiesSlice = createSlice({
  name: "quantities",
  initialState,
  reducers: {
    increment: (state) => {
      state.totalQuantities += 1;
    },
    decrement: (state) => {
      if (state.totalQuantities === 1) {
        return;
      }
      state.totalQuantities -= 1;
    },
  },
});

export const { increment, decrement } = quantitiesSlice.actions;

export type { QuantitiesState };
export default quantitiesSlice.reducer;
