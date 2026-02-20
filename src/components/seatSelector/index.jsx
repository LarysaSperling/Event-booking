import React from "react";
import styles from "./styles.module.css";

export default function SeatSelector({ seats, selectedSeats, onToggle }) {
  return (
    <div className={styles.seats}>
      {seats.map((seat) => {
        const isPicked = selectedSeats.includes(seat.id);

        return (
          <button
            key={seat.id}
            disabled={seat.isSelected}
            className={`${styles.seat}
              ${seat.isSelected ? styles.busy : ""}
              ${isPicked ? styles.active : ""}
            `}
            onClick={() => onToggle(seat.id)}
          >
            {seat.label}
          </button>
        );
      })}
    </div>
  );
}
