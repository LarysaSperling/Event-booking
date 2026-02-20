import React, { useMemo, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./styles.module.css";

function toKey(d) {
  const date = d instanceof Date ? d : new Date(d);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function monthKey(d) {
  const date = d instanceof Date ? d : new Date(d);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  return `${yyyy}-${mm}`;
}

export default function EventDetails({
  eventsData = [],
  selectedDate,
  onDateChange,
  selectedEventId,
  onEventChange,
}) {
  const availableSet = useMemo(
    () => new Set(eventsData.map((x) => toKey(x.date))),
    [eventsData]
  );

  const availableMonths = useMemo(
    () => new Set(eventsData.map((x) => monthKey(x.date))),
    [eventsData]
  );

  const selectedDateObj = useMemo(() => {
    if (!selectedDate) return new Date();
    const [y, m, d] = selectedDate.split("-").map(Number);
    return new Date(y, m - 1, d);
  }, [selectedDate]);

  
  const [activeMonthDate, setActiveMonthDate] = useState(selectedDateObj);

  const monthHasEvents = useMemo(() => {
    return availableMonths.has(monthKey(activeMonthDate));
  }, [availableMonths, activeMonthDate]);

  const currentDateBlock = useMemo(() => {
    return eventsData.find((x) => toKey(x.date) === selectedDate) || null;
  }, [eventsData, selectedDate]);

  const events = currentDateBlock?.events ?? [];
  const hasEvents = events.length > 0;

  const selectValue = useMemo(() => {
    if (!hasEvents) return "";
    return events.some((e) => e.id === selectedEventId)
      ? String(selectedEventId)
      : "";
  }, [hasEvents, events, selectedEventId]);

  return (
    <div className={styles.details}>
      <h2>Buchung</h2>

      <Calendar
        value={selectedDateObj}
        onChange={(date) => {
          onDateChange(toKey(date));
          onEventChange(null);
        }}
        onActiveStartDateChange={({ activeStartDate }) => {
          if (activeStartDate) setActiveMonthDate(activeStartDate);
        }}
        showNeighboringMonth={false}
        tileDisabled={({ date, view }) =>
          view === "month" && !availableSet.has(toKey(date))
        }
        tileClassName={({ date, view }) => {
          if (view !== "month") return "";
          const key = toKey(date);

          if (key === selectedDate) return styles.selectedDay;
          if (availableSet.has(key)) return styles.hasEventDay;

          return "";
        }}
      />

      {!monthHasEvents && (
        <p className={styles.monthHint}>Keine Veranstaltungen in diesem Monat</p>
      )}

      <label htmlFor="event-select">Veranstaltung:</label>
      <select
        id="event-select"
        name="eventSelect"
        value={selectValue}
        onChange={(e) => {
          const v = e.target.value;
          onEventChange(v ? Number(v) : null);
        }}
        disabled={!hasEvents}
      >
        {!hasEvents ? (
          <option value="">Keine Veranstaltungen</option>
        ) : (
          <>
            <option value="" disabled>
              Veranstaltung auswählen
            </option>
            {events.map((event) => (
              <option key={event.id} value={String(event.id)}>
                {event.title}
              </option>
            ))}
          </>
        )}
      </select>

      {!hasEvents && (
        <p className={styles.noEventsHint}>
          Bitte wählen Sie ein Datum mit verfügbaren Veranstaltungen
        </p>
      )}
    </div>
  );
}