import { configureStore } from "@reduxjs/toolkit";
import dateSlice from "./features/reservations/dateSlice";
import hourSlice from "./features/reservations/hourSlice";
import guestSlice from "./features/reservations/guestSlice";

export default configureStore({
  reducer: {
    date: dateSlice,
    hour: hourSlice,
    guest: guestSlice,
  },
});
