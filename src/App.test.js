import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils"; // Import act from react-dom/test-utils
import { MemoryRouter } from "react-router-dom";
import ReserveTable from "./components/forms/ReserveTable";

describe("ReserveTable Component", () => {
  test("Renders the ReserveTable heading", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <ReserveTable
            availableTimes={["17:00", "18:00"]}
            onDateChange={() => {}}
          />
        </MemoryRouter>
      );
    });

    const headingElement = screen.getByText(/Book Now/i);
    expect(headingElement).toBeInTheDocument();
  });

  test("Updates times when date is changed", async () => {
    const mockOnDateChange = jest.fn();

    await act(async () => {
      render(
        <MemoryRouter>
          <ReserveTable
            availableTimes={["17:00", "18:00"]}
            onDateChange={mockOnDateChange}
          />
        </MemoryRouter>
      );
    });

    const dateInput = screen.getByLabelText(/Choose date/i);
    fireEvent.change(dateInput, { target: { value: "2024-06-10" } });

    expect(mockOnDateChange).toHaveBeenCalledWith(new Date("2024-06-10"));
  });

  test("Selects time and guests", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <ReserveTable
            availableTimes={["17:00", "18:00"]}
            onDateChange={() => {}}
          />
        </MemoryRouter>
      );
    });

    const timeSelect = screen.getByLabelText(/Choose time/i);
    fireEvent.change(timeSelect, { target: { value: "18:00" } });

    const guestsInput = screen.getByLabelText(/Number of guests/i);
    fireEvent.change(guestsInput, { target: { value: "4" } });

    expect(timeSelect.value).toBe("18:00");
    expect(guestsInput.value).toBe("4");
  });
});
