import React, { useState, useMemo } from "react";
import EventDetails from "../eventDetails";
import SeatSelector from "../seatSelector";
import styles from "./styles.module.css";

function formatDate(date) {
  return date.toISOString().split("T")[0];
}

export default function EventBooking({ eventsData }) {
  const firstDate = formatDate(eventsData[0].date);

  const [selectedDate, setSelectedDate] = useState(firstDate);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const currentDateBlock = useMemo(() => {
    return eventsData.find(
      (item) => formatDate(item.date) === selectedDate
    );
  }, [selectedDate, eventsData]);

  const currentEvent = useMemo(() => {
    if (!currentDateBlock) return null;

    if (!selectedEventId) return currentDateBlock.events[0];

    return currentDateBlock.events.find(
      (e) => e.id === selectedEventId
    );
  }, [currentDateBlock, selectedEventId]);

  const toggleSeat = (seatId) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((id) => id !== seatId)
        : [...prev, seatId]
    );
  };

  return (
    <div className={styles.card}>
      <EventDetails
        eventsData={eventsData}
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        selectedEventId={currentEvent?.id}
        onEventChange={setSelectedEventId}
      />

      {currentEvent && (
        <>
          <h3>Select seats</h3>
          <SeatSelector
            seats={currentEvent.seats}
            selectedSeats={selectedSeats}
            onToggle={toggleSeat}
          />
          <p>
            Selected seats:{" "}
            {selectedSeats.length
              ? selectedSeats.join(", ")
              : "-"}
          </p>
        </>
      )}
    </div>
  );
}
