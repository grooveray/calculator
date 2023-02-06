import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginFooter.module.css";

export default function LoginFooter() {
  let navigate = useNavigate();

  return (
    <div className={styles.container}>
      <p>
        처음이신가요? 그럼{" "}
        <button onClick={() => navigate("/signup")} className={styles.signup}>
          회원가입
        </button>
        을 하세요.
      </p>
    </div>
  );
}
