import React from "react";
import styles from "./styles.module.css";

function formatDate(date) {
  return date.toISOString().split("T")[0];
}

export default function EventDetails({
  eventsData,
  selectedDate,
  onDateChange,
  selectedEventId,
  onEventChange
}) {
  const currentDateBlock = eventsData.find(
    (item) => formatDate(item.date) === selectedDate
  );

  const events = currentDateBlock ? currentDateBlock.events : [];

  return (
    <div className={styles.details}>
      <h2>Booking</h2>

      <label>
        Date:
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => onDateChange(e.target.value)}
        />
      </label>
      
      <label>
        Event:
        <select
          value={selectedEventId || ""}
          onChange={(e) => onEventChange(Number(e.target.value))}
        >
          {events.length === 0 && <option>No events</option>}
          {events.map((event) => (
            <option key={event.id} value={event.id}>
              {event.title}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
