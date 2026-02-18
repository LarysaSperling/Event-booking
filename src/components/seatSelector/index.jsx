import React from "react";
import styles from "./styles.module.css";

export default function SeatSelector({ seats, selected, onToggle }) {
  return (
    <div className={styles.seats}>
      {seats.map((seat) => {
        const active = selected.includes(seat);

        return (
          <button
            key={seat}
            className={`${styles.seat} ${
              active ? styles.active : ""
            }`}
            onClick={() => onToggle(seat)}
          >
            {seat}
          </button>
        );
      })}
    </div>
  );
}
