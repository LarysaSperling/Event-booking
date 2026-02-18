import React, { useState } from "react";
import EventDetails from "../eventDetails";
import SeatSelector from "../seatSelector";
import styles from "./styles.module.css";

export default function EventBooking() {
  const [selected, setSelected] = useState([]);

  const seats = ["1A", "1B", "1C", "1D", "1E", "1F", "1G"];

  const toggleSeat = (seat) => {
    setSelected((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  return (
    <div className={styles.card}>
      <EventDetails
        title="Concert of the Year"
        date="2023-12-01"
        venue="City Arena"
      />

      <SeatSelector seats={seats} selected={selected} onToggle={toggleSeat} />

      <p className={styles.selected}>
        Selected Seats: {selected.join(", ") || "—"}
      </p>
    </div>
  );
}

