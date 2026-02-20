import React from "react";
import styles from "./styles.module.css";

export default function SeatSelector({
  seats = [],
  selectedSeats = [],
  onToggle,
}) {
  return (
    <div className={styles.seats}>
      {seats.map((seat) => {
        const isActive = selectedSeats.includes(seat.id);
        const isBusy = seat.isBooked;

        return (
          <button
            key={seat.id}
            type="button"
            className={[
              styles.seat,
              isActive ? styles.active : "",
              isBusy ? styles.busy : "",
            ]
              .filter(Boolean)
              .join(" ")}
            disabled={isBusy}
            onClick={() => onToggle(seat.id)}
            aria-pressed={isActive}
            aria-disabled={isBusy}
          >
            {seat.label}
          </button>
        );
      })}
    </div>
  );
}
