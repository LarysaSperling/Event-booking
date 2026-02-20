import React, { useEffect, useMemo, useState } from "react";
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
    ) || null;
  }, [eventsData, selectedDate]);

 
  const events = currentDateBlock?.events ?? [];


  const currentEvent = useMemo(() => {
    if (!events.length) return null;
    return events.find((e) => e.id === selectedEventId) ?? events[0];
  }, [events, selectedEventId]);

  
  useEffect(() => {
    const firstEventId = events[0]?.id ?? null;
    setSelectedEventId(firstEventId);
    setSelectedSeats([]);
  }, [selectedDate, events]);

  useEffect(() => {
    setSelectedSeats([]);
  }, [selectedEventId]);

  const toggleSeat = (seatId) => {
    if (!currentEvent) return;

    const seat = currentEvent.seats.find((s) => s.id === seatId);
    if (!seat || seat.isSelected) return;

    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((id) => id !== seatId)
        : [...prev, seatId]
    );
  };

  const selectedSeatLabels = useMemo(() => {
    if (!currentEvent) return [];
    const map = new Map(currentEvent.seats.map((s) => [s.id, s.label]));
    return selectedSeats.map((id) => map.get(id)).filter(Boolean);
  }, [selectedSeats, currentEvent]);

  return (
    <div className={styles.card}>
      <EventDetails
        eventsData={eventsData}
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        selectedEventId={selectedEventId}
        onEventChange={setSelectedEventId}
      />

      {currentEvent ? (
        <>
          <h3>Select seats</h3>

          <SeatSelector
            seats={currentEvent.seats}
            selectedSeats={selectedSeats}
            onToggle={toggleSeat}
          />

          <p className={styles.selected}>
            Selected seats:{" "}
            {selectedSeatLabels.length
              ? selectedSeatLabels.join(", ")
              : "-"}
          </p>
        </>
      ) : (
        <p className={styles.selected}>
          No events for this date
        </p>
      )}
    </div>
  );
}
