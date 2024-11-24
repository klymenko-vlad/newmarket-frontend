"use client";

import { Product } from "@/types/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CartItemsState {
  cartItems: Product[];
  totalQuantities: number;
  totalPrice: number;
}

const initialState: CartItemsState = {
  cartItems: [],
  totalQuantities: 0,
  totalPrice: 0,
};

const cartItemsSlice = createSlice({
  name: "cartItems",
  initialState,
  reducers: {
    incrementQuantities: (state) => {
      state.totalQuantities += 1;
    },
    decrementQuantities: (state) => {
      if (state.totalQuantities === 1) {
        return;
      }
      state.totalQuantities -= 1;
    },

    addToCartItems: (
      state,
      action: PayloadAction<{ product: Product; quantity: number }>,
    ) => {
      const checkProductInCart = state.cartItems.find(
        (item) => item._id === action.payload.product._id,
      );

      state.totalPrice =
        state.totalPrice +
        action.payload.product.price * action.payload.quantity;

      state.totalQuantities += action.payload.quantity;

      if (checkProductInCart) {
        state.cartItems.map((cartProduct) => {
          if (cartProduct._id === action.payload.product._id) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + action.payload.quantity,
            };
          }
          return cartProduct;
        });
      } else {
        action.payload.product.quantity = action.payload.quantity;

        state.cartItems = [...state.cartItems, { ...action.payload.product }];
      }
    },
    removeFromCartItems: () => {},
  },
});

export const {
  addToCartItems,
  removeFromCartItems,
  incrementQuantities,
  decrementQuantities,
} = cartItemsSlice.actions;

export type { CartItemsState };
export default cartItemsSlice.reducer;
