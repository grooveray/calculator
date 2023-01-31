import React from "react";
import styles from "./Header.module.css";

export default function Header({
  mainLists,
  mainList,
  setMainList,
  setShowResult,
}) {
  const onClick = (list) => {
    setMainList(list);
    setShowResult(false);
  };
  return (
    <header className={styles.container}>
      <ul className={styles.lists}>
        {mainLists.map((list, index) => (
          <li key={index}>
            <button
              className={`${styles.button} ${
                list === mainList && styles.selected
              }`}
              onClick={() => onClick(list)}
            >
              {list}
            </button>
          </li>
        ))}
      </ul>
    </header>
  );
}
