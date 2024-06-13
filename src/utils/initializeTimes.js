import { fetchAPI } from "../api";
// Initialize available times (initial state)
export const initializeTimes = () => {
  const date = new Date();
  try {
    const times = fetchAPI(date);
    return times;
  } catch (error) {
    console.error("Error initializing times:", error);
    return []; // Return an empty array on error
  }
};

// Update available times based on the selected date
export const updateTimes = (date) => {
  try {
    return fetchAPI(date);
  } catch (error) {
    console.error("Error updating times:", error);
    return []; // Return an empty array on error
  }
};
