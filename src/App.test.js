import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import ReserveTable from "./components/forms/ReserveTable";

describe("ReserveTable Component", () => {
  const renderComponent = (props = {}) => {
    return render(
      <MemoryRouter>
        <ReserveTable
          availableTimes={["17:00", "18:00"]}
          onDateChange={() => {}}
          {...props}
        />
      </MemoryRouter>
    );
  };

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

describe("ReserveTable Component", () => {
  // Reusable render function
  const renderComponent = (props = {}) => {
    return render(
      <MemoryRouter>
        <ReserveTable
          availableTimes={["17:00", "18:00"]}
          onDateChange={() => {}}
          {...props}
        />
      </MemoryRouter>
    );
  };

  // Test HTML5 validation attributes
  test("Validates HTML5 attributes are applied", async () => {
    await act(async () => {
      renderComponent();
    });

    const dateInput = screen.getByLabelText(/Choose date/i);
    expect(dateInput).toHaveAttribute("aria-required");

    const timeSelect = screen.getByLabelText(/Choose time/i);
    expect(timeSelect).toHaveAttribute("aria-required");

    const guestsInput = screen.getByLabelText(/Number of Guests/i);
    expect(guestsInput).toHaveAttribute("aria-valuemin", "1");
    expect(guestsInput).toHaveAttribute("aria-valuemax", "10");
  });

  // Test JavaScript validation functions
  test("Displays error messages for invalid inputs", async () => {
    await act(async () => {
      renderComponent();
    });

    const submitButton = screen.getByText(/submit/i);

    fireEvent.click(submitButton);

    // Wait for error messages to appear
    await waitFor(() => {
      expect(screen.getByText("Date is required")).toBeInTheDocument();
      expect(screen.getByText("Time is required")).toBeInTheDocument();
      expect(
        screen.getByText("Number of guests is required")
      ).toBeInTheDocument();
      expect(screen.getByText("Occasion is required")).toBeInTheDocument();
    });
  });

  test("Does not display error messages for valid inputs", async () => {
    await act(async () => {
      renderComponent();
    });

    const dateInput = screen.getByLabelText(/Choose date/i);
    fireEvent.change(dateInput, { target: { value: "2024-06-10" } });

    const timeSelect = screen.getByLabelText(/Choose time/i);
    fireEvent.change(timeSelect, { target: { value: "18:00" } });

    const guestsInput = screen.getByLabelText(/Number of Guests/i);
    fireEvent.change(guestsInput, { target: { value: "4" } });

    const occasionSelect = screen.getByLabelText(/Occasion/i);
    fireEvent.change(occasionSelect, { target: { value: "Birthday" } });

    const submitButton = screen.getByText(/submit/i);
    fireEvent.click(submitButton);

    // Expect no error messages to be displayed
    expect(screen.queryByText(/Date is required/i)).toBeNull();
    expect(screen.queryByText(/Time is required/i)).toBeNull();
    expect(screen.queryByText(/Number of guests is required/i)).toBeNull();
    expect(screen.queryByText(/Occasion is required/i)).toBeNull();
  });
});
