import { createSlice } from "@reduxjs/toolkit";
export const guestSlice = createSlice({
  name: "guest",
  initialState: {
    guests: undefined,
  },
  reducers: {
    setGuests: (state, action) => {
      state.guest = action.payload;
    },
  },
});

export const { setGuests } = guestSlice.actions;
export default guestSlice.reducer;
