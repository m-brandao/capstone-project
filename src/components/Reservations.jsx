import { useRef, useState, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import ReserveTable from "./forms/ReserveTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { initializeTimes, updateTimes } from "../utils/initializeTimes";
import "../styles/Reservations.scss";

// Reducer function for availableTimes
const timesReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_TIMES":
      return action.payload;
    default:
      return state;
  }
};

export default function Reservations() {
  const navigate = useNavigate();
  const dialogRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Use reducer for available times
  const [availableTimes, dispatch] = useReducer(timesReducer, [], () => {
    const times = initializeTimes();
    return times;
  });

  // Effect to synchronize the dialog's open state with isModalOpen
  useEffect(() => {
    const handleDialogClose = () => {
      // Redirect to homepage on dialog close
      navigate("/");
    };

    if (dialogRef.current) {
      dialogRef.current.addEventListener("close", handleDialogClose);

      if (isModalOpen) {
        dialogRef.current.showModal();
      } else {
        dialogRef.current.close();
      }
    }

    return () => {
      if (dialogRef.current) {
        dialogRef.current.removeEventListener("close", handleDialogClose);
      }
    };
  }, [isModalOpen, navigate]);

  const toggleDialog = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Function to update available times based on date
  const handleDateChange = async (date) => {
    const times = await updateTimes(date);
    dispatch({ type: "UPDATE_TIMES", payload: times });
  };

  return (
    <>
      <header id="reservations-header">
        <h1>Little Lemon</h1>
        <h2>Chicago</h2>
      </header>

      <main id="reservations-main">
        <button className="get-back" onClick={() => navigate(-1)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={512}
            height={512}
            fill="none"
            style={{
              WebkitPrintColorAdjust: ":exact",
            }}
            viewBox="1430 135762 512 512"
          >
            <defs>
              <clipPath id="a" className="frame-clip frame-clip-def">
                <rect
                  width={512}
                  height={512}
                  x={1430}
                  y={135762}
                  rx={0}
                  ry={0}
                />
              </clipPath>
            </defs>
            <g clipPath="url(#a)">
              <g className="fills">
                <rect
                  width={512}
                  height={512}
                  x={1430}
                  y={135762}
                  className="frame-background"
                  rx={0}
                  ry={0}
                />
              </g>
              <g className="frame-children">
                <path
                  d="M1686 136274c141.385 0 256-114.615 256-256s-114.615-256-256-256-256 114.615-256 256 114.615 256 256 256Zm129-281c9.4 9.4 9.4 24.6 0 33.9-9.4 9.3-24.6 9.4-33.9 0l-71-71v182.1c0 13.3-10.7 24-24 24s-24-10.7-24-24v-182.1l-71 71c-9.4 9.4-24.6 9.4-33.9 0-9.3-9.4-9.4-24.6 0-33.9l111.8-112c9.4-9.4 24.6-9.4 33.9 0l112.1 112Z"
                  className="fills"
                  style={{
                    fill: "#000",
                  }}
                />
              </g>
            </g>
          </svg>
        </button>
        {/* <h3>Or you can order for delivery!</h3>

        <section id="horizontal-scroll">
          <div className="scroll-container">
            <div className="scroll-content">
              <a>Lunch</a>
              <a>Mains</a>
              <a>Mains</a>
              <a>Mains</a>
              <a>Mains</a>
              <a>Mains</a>
              <a>Mains</a>
              <a>Mains</a>
              <a>Mains</a>
              <a>Mains</a>
              <a>Mains</a>
              <a>Mains</a>
              <a>Mains</a>
              <a>Mains</a>
              <a>Mains</a>
              <a>Mains</a>
            </div>
          </div>
        </section> */}

        <ReserveTable
          availableTimes={availableTimes}
          onDateChange={handleDateChange}
        />
        {/* Modal for the successful table book */}
        <dialog ref={dialogRef} className="react-modal">
          <div className="dialog-content">
            {/* <FontAwesomeIcon
              className="check-icon"
              autoFocus
              icon={faCircleCheck}
            /> */}
            <svg
              className="checkmark"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 52 52"
            >
              {" "}
              <circle
                className="checkmark__circle"
                cx="26"
                cy="26"
                r="25"
                fill="none"
              />{" "}
              <path
                className="checkmark__check"
                fill="none"
                d="M14.1 27.2l7.1 7.2 16.7-16.8"
              />
            </svg>
            <p>Table Booked</p>
            <FontAwesomeIcon
              className="close-modal"
              icon={faTimes}
              onClick={toggleDialog}
            />
          </div>
        </dialog>
      </main>
    </>
  );
}
