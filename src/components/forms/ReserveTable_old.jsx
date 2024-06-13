import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faUser,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../styles/ReserveTable.scss";
import { useDispatch, useSelector } from "react-redux";
import { setDate } from "../../features/reservations/dateSlice";
import { setHour } from "../../features/reservations/hourSlice";
import { setGuests } from "../../features/reservations/guestSlice";
import Selectors from "../UI_Components/Selectors";

export default function ReserveTable(props) {
  const date = useSelector((state) => state.date.date);
  const hour = useSelector((state) => state.hour.hour);
  const guests = useSelector((state) => state.guest.guest);
  const dispatch = useDispatch();
  const today = new Date();

  function onChangeDate(nextValue) {
    dispatch(setDate(nextValue.getTime()));
    dispatch(setHour(null));
    dispatch(setGuests(null));
  }

  function onChangeHour(e) {
    dispatch(setHour(e.target.value));
    dispatch(setGuests(null));
  }

  function onChangeGuests(e) {
    dispatch(setGuests(e.target.value));
  }

  function resetField(field) {
    switch (field) {
      case "date":
        dispatch(setDate(null));
        break;
      case "hour":
        dispatch(setHour(null));
        break;
      case "guests":
        dispatch(setGuests(null));
        break;
      default:
        break;
    }
  }

  // Debug date
  //   useEffect(() => {
  //     console.log("New date:", new Date(date));
  //     console.log("New date:", date);
  //   }, [date]);

  // Debug hour
  //   useEffect(() => {
  //     console.log("New hour:", hour);
  //   }, [hour]);

  // Debug guests
  //   useEffect(() => {
  //     console.log("New guests:", guests);
  //   }, [guests]);

  function disableOffWorkDays({ date, view }) {
    // Disable weekends
    return view === "month" && (date.getDay() === 0 || date.getDay() === 1);
  }

  return (
    <>
      <section id="reservation">
        <div id="reservation-card">
          <section className="reservation-head">
            <h3>Book a table</h3>
            <p>Book for free</p>
          </section>
          <section className="reservation-body">
            <div id="reservation-steps">
              <div className={date ? "done-start" : `active`}>
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  onClick={() => resetField("date")}
                />
              </div>
              <div className={date && hour ? "done-middle" : `active-middle`}>
                <FontAwesomeIcon
                  icon={faClock}
                  onClick={() => resetField("hour")}
                />
              </div>
              <div
                className={date && hour && guests ? "done-end" : `active-end`}
              >
                <FontAwesomeIcon
                  icon={faUser}
                  onClick={() => resetField("guests")}
                />
              </div>
            </div>
            {!date && (
              <Calendar
                onChange={onChangeDate}
                minDate={today}
                tileDisabled={disableOffWorkDays}
              />
            )}

            {date && !hour && (
              <div className="react-hour">
                <h1>Hour Selector</h1>
                <h3>Lunch</h3>
                <div className="hour-grid">
                  {["13:00", "13:30", "14:00", "14:30", "15:00"].map((time) => (
                    <Selectors
                      key={time}
                      value={time}
                      selected={hour === time}
                      onClick={() => onChangeHour({ target: { value: time } })}
                    />
                  ))}
                </div>
                <h3>Dinner</h3>
                <div className="hour-grid">
                  {["20:00", "20:30", "21:00", "21:30", "22:00", "22:30"].map(
                    (time) => (
                      <Selectors
                        key={time}
                        value={time}
                        selected={hour === time}
                        onClick={() =>
                          onChangeHour({ target: { value: time } })
                        }
                      />
                    )
                  )}
                </div>
              </div>
            )}

            {date && hour && !guests && (
              <div className="react-guest">
                <div className="guest-grid">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((guest) => (
                    <Selectors
                      key={guest}
                      value={guest}
                      selected={guests === guest}
                      onClick={() =>
                        onChangeGuests({ target: { value: guest } })
                      }
                    />
                  ))}
                </div>
              </div>
            )}

            {date && hour && guests && (
              <div className="react-confirm">
                <h3>Reservation info</h3>
                <p>Date: {new Date(date).toLocaleDateString()}</p>
                <p>Hour: {hour}</p>
                <p>Guests: {guests}</p>
                <button
                  className="btn-confirm"
                  onClick={() => {
                    resetField("date");
                    resetField("hour");
                    resetField("guests");
                    props.toggleDialog();
                  }}
                >
                  Book
                </button>
              </div>
            )}
          </section>
        </div>
      </section>
    </>
  );
}
