import React from "react";
import styles from "./Input.module.css";

export default function Input({ label, onChange, inputs }) {
  const { id, text, name } = label;
  function getSpanText(name) {
    switch (name) {
      case "day":
        return " (일)";
      case "inCount":
        return " (수)";
      case "outCount":
        return " (수)";
      case "totalWeight":
        return " (kg)";
      case "feedAmount":
        return " (kg)";
      default:
        return "";
    }
  }
  return (
    <div className={styles.list}>
      <label className={styles.label} htmlFor={id}>
        {text}
        <span className={styles.unit}>{getSpanText(name)}</span>
      </label>
      <input
        className={styles.input}
        type="number"
        id={id}
        name={name}
        step="0.1"
        onChange={onChange}
        placeholder={`${text}(을)를 입력하세요`}
        value={inputs[name] ? inputs[name] : ""}
      />
    </div>
  );
}
