import React from "react";
import styles from "./Select.module.css";

const companyLists = [
  "수원",
  "양주",
  "안양",
  "미래부",
  "서부",
  "천하제일",
  "사조",
  "카길",
  "퓨리나",
  "중앙",
  "우성",
  "무지개",
  "기타",
];

export default function Select({ onSelect }) {
  return (
    <div className={styles.container}>
      <select className={styles.select} name="company" onChange={onSelect}>
        <option className={styles.option} defaultValue="" hidden>
          사료회사명을 선택해주세요
        </option>
        {companyLists.map((list, index) => (
          <option className={styles.option} key={index} value={list}>
            {list}
          </option>
        ))}
      </select>
    </div>
  );
}
