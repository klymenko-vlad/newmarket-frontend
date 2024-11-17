"use client";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface showMenuState {
  isCart: boolean;
  isBurgerMenu: boolean;
  isWishList: boolean;
}

const initialState: showMenuState = {
  isCart: false,
  isBurgerMenu: false,
  isWishList: false,
};

const showMenuSlice = createSlice({
  name: "showMenu",
  initialState,
  reducers: {
    showIsCart: (state, action: PayloadAction<boolean>) => {
      state.isCart = action.payload;
      state.isBurgerMenu = action.payload && false;
      state.isWishList = action.payload && false;
    },
    showIsBurgerMenu: (state, action: PayloadAction<boolean>) => {
      state.isCart = action.payload && false;
      state.isBurgerMenu = action.payload;
      state.isWishList = action.payload && false;
    },
    showIsWishList: (state, action: PayloadAction<boolean>) => {
      state.isCart = action.payload && false;
      state.isBurgerMenu = action.payload && false;
      state.isWishList = action.payload;
    },
  },
});

export const { showIsBurgerMenu, showIsCart, showIsWishList } =
  showMenuSlice.actions;

export type { showMenuState };
export default showMenuSlice.reducer;
