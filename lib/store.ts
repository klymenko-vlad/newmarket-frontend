import { configureStore } from "@reduxjs/toolkit";
import quantitiesReducer, {
  QuantitiesState,
} from "./Features/quantities/quantitiesSlice";

import showMenuReducer, {
  showMenuState,
} from "./Features/showMenu/showMenuSlice";

export const store = configureStore<{
  quantities: QuantitiesState;
  showMenu: showMenuState;
}>({
  reducer: {
    quantities: quantitiesReducer,
    showMenu: showMenuReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
