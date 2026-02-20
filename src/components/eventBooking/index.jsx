import React, { useEffect, useMemo, useState } from "react";
import EventDetails from "../eventDetails";
import SeatSelector from "../seatSelector";
import styles from "./styles.module.css";

function toKey(d) {
  const date = d instanceof Date ? d : new Date(d);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default function EventBooking({ eventsData = [] }) {
  const firstDate = useMemo(() => {
    const d = eventsData?.[0]?.date;
    return d ? toKey(d) : null;
  }, [eventsData]);

  const [selectedDate, setSelectedDate] = useState(firstDate);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    if (firstDate && !selectedDate) setSelectedDate(firstDate);
  }, [firstDate, selectedDate]);

  const currentDateBlock = useMemo(() => {
    if (!selectedDate) return null;
    return eventsData.find((x) => toKey(x.date) === selectedDate) || null;
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
    if (!seat || seat.isBooked) return;

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

  if (!eventsData.length) {
    return <div className={styles.card}>Keine Veranstaltungsdaten</div>;
  }

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
        <div className={styles.section}>
          <h3>Sitzplätze auswählen</h3>

          <SeatSelector
            seats={currentEvent.seats}
            selectedSeats={selectedSeats}
            onToggle={toggleSeat}
          />

          <p className={styles.selected}>
            Ausgewählte Plätze:{" "}
            {selectedSeatLabels.length ? selectedSeatLabels.join(", ") : "-"}
          </p>
        </div>
      ) : (
        <p className={styles.selected}>Keine Veranstaltungen für dieses Datum</p>
      )}
    </div>
  );
}
