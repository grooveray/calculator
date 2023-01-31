import React from "react";
import styles from "./EachReport.module.css";

export default function EachReport({ result }) {
  const results = [
    { title: "사육일수", value: transValue(result.day, 1) },
    { title: "입추수수", value: transValue(result.inCount, 0) },
    { title: "출하수수", value: transValue(result.outCount, 0) },
    { title: "출하 총중량", value: transValue(result.totalWeight, 0) },
    { title: "총 사료량", value: transValue(result.feedAmount, 0) },
    { title: "평균체중", value: transValue(result.averageWeight, 3) },
    { title: "사료효율", value: transValue(result.feedEfficiency, 3) },
    { title: "생산지수", value: transValue(result.productionIndex, 2) },
    { title: "육성율", value: transValue(result.upbringingRate, 1) },
  ];

  return (
    <ul className={styles.lists}>
      {results.map((result, index) => (
        <li className={styles.list} key={index}>
          <span className={styles.title}>{result.title}</span>
          <span className={styles.subtitle}>{result.value}</span>
        </li>
      ))}
    </ul>
  );
}

function transValue(value, floatNumber) {
  return parseFloat(value.toFixed(floatNumber)).toLocaleString("ko-KR");
}
// function transDate(dateString) {
//   const year = dateString.slice(2, 4);
//   const date = dateString.slice(5, 10).split("-");
//   const month = date[0];
//   const day = date[1];
//   const time = dateString.slice(11, 16);
//   return `${year}/${month}/${day} (${time})`;
// }
