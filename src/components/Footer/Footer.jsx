import React from "react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.developer}>개발한 사람 : 김민홍</p>
      <p className={styles.phone}>이용문의 : 010-3088-3420</p>
    </footer>
  );
}
