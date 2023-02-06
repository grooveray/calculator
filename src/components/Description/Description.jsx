import React from "react";
import styles from "./Description.module.css";

export default function Description() {
  return (
    <div className={styles.container}>
      <p>로그인을 하면,</p>
      <p>
        성적데이터를 <span className={styles.accent}>저장</span>,{" "}
        <span className={styles.accent}>조회</span> 그리고{" "}
        <span className={styles.accent}>사료회사별 성적추이</span>도 확인해 볼
        수 있습니다.{" "}
      </p>
    </div>
  );
}
