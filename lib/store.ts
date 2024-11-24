import { configureStore } from "@reduxjs/toolkit";

import showMenuReducer, {
  showMenuState,
} from "./Features/showMenu/showMenuSlice";

import wishListReducer, {
  WishListState,
} from "./Features/wishList/wishListSlice";

import cartItemsReducer, {
  CartItemsState,
} from "./Features/cartItems/cartItemsSlice";

export const store = configureStore<{
  showMenu: showMenuState;
  wishList: WishListState;
  cartItems: CartItemsState;
}>({
  reducer: {
    showMenu: showMenuReducer,
    wishList: wishListReducer,
    cartItems: cartItemsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
