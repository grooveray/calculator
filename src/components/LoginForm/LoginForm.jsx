import React from "react";
import styles from "./LoginForm.module.css";

export default function LoginForm({ inputs, onChange, onSubmit }) {
  const { email, password } = inputs;
  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <div className={styles.inputBundle}>
        <label className={styles.label} htmlFor="email">
          이메일
        </label>
        <input
          id="email"
          className={styles.input}
          name="email"
          type="email"
          onChange={onChange}
          value={email}
          placeholder="이메일을 입력해주세요"
        />
      </div>
      <div className={styles.inputBundle}>
        <label className={styles.label} htmlFor="password">
          비밀번호
        </label>
        <input
          id="password"
          className={styles.input}
          name="password"
          type="password"
          onChange={onChange}
          value={password}
          placeholder="비밀번호를 입력해주세요"
        />
      </div>
      <div>
        <button className={styles.button}>로그인</button>
      </div>
    </form>
  );
}
