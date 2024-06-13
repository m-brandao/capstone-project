import { createSlice } from "@reduxjs/toolkit";
export const dateSlice = createSlice({
  name: "date",
  initialState: {
    date: undefined,
  },
  reducers: {
    setDate: (state, action) => {
      state.date = action.payload;
    },
  },
});

export const { setDate } = dateSlice.actions;
export default dateSlice.reducer;
