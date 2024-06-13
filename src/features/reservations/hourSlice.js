import { createSlice } from "@reduxjs/toolkit";
export const hourSlice = createSlice({
  name: "hour",
  initialState: {
    hour: undefined,
  },
  reducers: {
    setHour: (state, action) => {
      state.hour = action.payload;
    },
  },
});

export const { setHour } = hourSlice.actions;
export default hourSlice.reducer;
