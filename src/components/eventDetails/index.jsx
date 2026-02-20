import React, { useMemo } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./styles.module.css";

function toKey(date) {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function monthKey(date) {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  return `${yyyy}-${mm}`;
}

export default function EventDetails({
  eventsData,
  selectedDate,
  onDateChange,
  selectedEventId,
  onEventChange,
}) {
  const availableSet = useMemo(() => {
    return new Set(eventsData.map((x) => toKey(x.date)));
  }, [eventsData]);

  const availableMonths = useMemo(() => {
    return new Set(eventsData.map((x) => monthKey(x.date)));
  }, [eventsData]);

  const selectedDateObj = useMemo(() => {
    return selectedDate ? new Date(`${selectedDate}T00:00:00`) : new Date();
  }, [selectedDate]);

  const selectedMonthHasEvents = useMemo(() => {
    return availableMonths.has(monthKey(selectedDateObj));
  }, [availableMonths, selectedDateObj]);

  const currentDateBlock = useMemo(() => {
    return eventsData.find((x) => toKey(x.date) === selectedDate) || null;
  }, [eventsData, selectedDate]);

  const events = currentDateBlock?.events ?? [];
  const hasEvents = events.length > 0;

  const selectValue = useMemo(() => {
    if (!hasEvents) return "";
    return events.some((e) => e.id === selectedEventId) ? selectedEventId : "";
  }, [hasEvents, events, selectedEventId]);

  return (
    <div className={styles.details}>
      <h2>Booking</h2>

      <Calendar
        value={selectedDateObj}
        onChange={(date) => {
          const key = toKey(date);
          onDateChange(key);
          onEventChange(null);
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

      {!selectedMonthHasEvents && (
        <p className={styles.monthHint}>
          Нет событий в этом месяце
        </p>
      )}

      <label htmlFor="event-select">Event:</label>
      <select
        id="event-select"
        name="eventSelect"
        value={selectValue}
        onChange={(e) => onEventChange(Number(e.target.value))}
        disabled={!hasEvents}
      >
        {!hasEvents ? (
          <option value="">No events</option>
        ) : (
          <>
            <option value="" disabled>
              Choose event
            </option>
            {events.map((event) => (
              <option key={event.id} value={event.id}>
                {event.title}
              </option>
            ))}
          </>
        )}
      </select>
    </div>
  );
}