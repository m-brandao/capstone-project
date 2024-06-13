import { useState } from "react";
import { submitAPI } from "../../api";
import "../../styles/ReserveTable.scss";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function ReserveTable({ availableTimes, onDateChange }) {
  const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [resTime, setResTime] = useState("");
  const [guests, setGuests] = useState(1);
  const [occasion, setOccasion] = useState("Birthday");
  const [loading, setLoading] = useState(false);

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setDate(newDate);
    onDateChange(new Date(newDate)); // Call handler to update times
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { date, resTime, guests, occasion };
    try {
      setLoading(true);
      const success = submitAPI(formData);
      setTimeout(() => {
        if (success && date !== "" && resTime !== "") {
          setDate("");
          setGuests(1);
          setResTime("");
          setOccasion("Birthday");
          setLoading(false);
          navigate("/ConfirmedBooking");
        } else {
          setLoading(false);
          alert("Failed to submit reservation.");
        }
      }, 1000);
    } catch (error) {
      console.error("Error submitting reservation:", error);
      alert("An error occurred while submitting the reservation.");
    }
  };

  return (
    <section id="reservation">
      <h1>Book Now</h1>
      <form
        style={{ display: "grid", maxWidth: "200px", gap: "20px" }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="res-date">Choose date</label>
        <input
          type="date"
          id="res-date"
          value={date}
          onChange={handleDateChange}
        />
        <label htmlFor="res-time">Choose time</label>
        <select
          id="res-time"
          value={resTime}
          onChange={(e) => setResTime(e.target.value)}
        >
          {Array.isArray(availableTimes) &&
            availableTimes.map((time) => <option key={time}>{time}</option>)}
        </select>
        <label htmlFor="guests">Number of guests</label>
        <input
          type="number"
          placeholder="1"
          min="1"
          max="10"
          id="guests"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
        />
        <label htmlFor="occasion">Occasion</label>
        <select
          id="occasion"
          value={occasion}
          onChange={(e) => setOccasion(e.target.value)}
        >
          <option>Birthday</option>
          <option>Anniversary</option>
        </select>
        <button type="submit" disabled={loading}>
          Make Your reservation{" "}
          {loading && <FontAwesomeIcon icon={faSpinner} spinPulse />}
        </button>
      </form>
    </section>
  );
}
