import React from "react";
import styles from "./Select.module.css";

export default React.memo(function Select({
  onSelect,
  lists,
  isDate,
  isGuess,
}) {
  return (
    <div className={styles.container}>
      <select className={styles.select} name="company" onChange={onSelect}>
        <option className={styles.option} defaultValue="" hidden>
          {isDate
            ? "조회할 년도를 선택하세요"
            : isGuess
            ? "현재사육일수를 선택하세요"
            : "사료회사명을 선택해주세요"}
        </option>
        {lists.map((list, index) => (
          <option className={styles.option} key={index} value={list}>
            {list}
          </option>
        ))}
      </select>
    </div>
  );
});
