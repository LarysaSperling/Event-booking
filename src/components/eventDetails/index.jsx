import React from "react";
import styles from "./styles.module.css";

export default function EventDetails({ title, date, venue }) {
  return (
    <div className={styles.details}>
      <h1>{title}</h1>
      <p>{date}</p>
      <p>{venue}</p>
    </div>
  );
}
