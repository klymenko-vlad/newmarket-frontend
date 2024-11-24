"use client";

import { Product } from "@/types/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface WishListState {
  wishListItems: Product[];
}

const initialState: WishListState = {
  wishListItems: [],
};

const wishListSlice = createSlice({
  name: "wishList",
  initialState,
  reducers: {
    addToWishList: (state, action: PayloadAction<Product>) => {
      if (state.wishListItems.length > 20) {
        // return toast.error("You already have 20 products in wish list.");
        throw new Error("You already have 20 products in wish list.");
        //TODO FIX THIS TOAST
      }
      const checkUpdatedWishListItems = state.wishListItems.find(
        (item) => item._id === action.payload._id,
      );

      if (checkUpdatedWishListItems) {
        // return toast.error("Already added to the wish list", {
        //   duration: 4000,
        // });
        //TODO FIX THIS TOAST
        throw new Error("Already added to the wish list.");
      }

      state.wishListItems.push(action.payload);

      // toast.success(`${product.name} added to the wish list`);
    },

    removeItemFromWishList: (state, action: PayloadAction<Product>) => {
      const isProductExist = state.wishListItems.find(
        (item) => item._id === action.payload._id,
      );

      if (!isProductExist) return;

      state.wishListItems = state.wishListItems.filter(
        (item) => item._id !== action.payload._id,
      );
    },
  },
});

export const { addToWishList, removeItemFromWishList } = wishListSlice.actions;

export type { WishListState };
export default wishListSlice.reducer;
