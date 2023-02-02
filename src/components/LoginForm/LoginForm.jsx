import React from "react";

export default function LoginForm({ inputs, onChange, onSubmit }) {
  const { email, password } = inputs;
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="email">이메일</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={onChange}
          value={email}
          placeholder="이메일을 입력해주세요"
        />
      </div>
      <div>
        <label htmlFor="password">비밀번호</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={onChange}
          value={password}
          placeholder="비밀번호를 입력해주세요"
        />
      </div>
      <div>
        <button>로그인</button>
      </div>
    </form>
  );
}
