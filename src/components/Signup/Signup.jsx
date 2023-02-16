import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../../api/users";
import styles from "./Signup.module.css";

const initialInputs = {
  local: "",
  name: "",
  email: "",
  phone: "",
  password: "",
  confirm: "",
};
const inputLists = [
  { id: "local", name: "local", type: "text", text: "지역" },
  { id: "name", name: "name", type: "text", text: "이름" },
  { id: "email", name: "email", type: "email", text: "이메일" },
  { id: "phone", name: "phone", type: "text", text: "전화" },
  { id: "password", name: "password", type: "password", text: "비밀번호" },
  { id: "confirm", name: "confirm", type: "password", text: "비밀번호확인" },
];

export default function Signup() {
  const [inputs, setInputs] = useState(initialInputs);
  const navigate = useNavigate();
  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value.trim(),
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const { local, name, email, phone, password, confirm } = inputs;
    if (!(inputs && local && name && email && phone && password && confirm))
      return alert("빈 항목이 존재합니다. 전부 입력해주세요.");
    if (password !== confirm) return alert("비밀번호 확인이 틀렸습니다.");
    if (local.length > 2) return alert("지역: 2자 이내로 입력(예)고양");
    if (phone.includes("-") || phone.includes("."))
      return alert("전화: 숫자만 입력해주세요.");
    const user = {
      local,
      name,
      email,
      phone,
      password,
    };
    signupUser(user)
      .then((response) => {
        if (response.status === 409)
          return alert("해당 이메일정보를 가진 유저가 이미 존재합니다.");
        alert("회원가입이 완료되었습니다. 로그인을 해주세요.");
        navigate("/Login");
      })
      .catch((e) => {
        return alert("시스템 오류 관리자에게 문의해주세요.");
      });
  };
  return (
    <form onSubmit={onSubmit} className={styles.form}>
      {inputLists.map((list) => (
        <div key={list.id} className={styles.inputBundle}>
          <label className={styles.label} htmlFor={list.id}>
            {list.text}
          </label>
          <input
            id={list.id}
            className={styles.input}
            name={list.name}
            type={list.type}
            onChange={onChange}
            value={getValue(list.name, inputs)}
            placeholder={getPlaceHolder(list.name)}
          />
        </div>
      ))}
      <div>
        <button className={styles.button}>입력완료</button>
      </div>
    </form>
  );
}

function getValue(name, inputs) {
  switch (name) {
    case "name":
      return inputs.name;
    case "email":
      return inputs.email;
    case "phone":
      return inputs.phone;
    case "password":
      return inputs.password;
    case "confirm":
      return inputs.confirm;
    case "local":
      return inputs.local;
    default:
      return "";
  }
}
function getPlaceHolder(name) {
  switch (name) {
    case "phone":
      return `"-" 없이 입력해주세요`;
    case "name":
      return `이름을 입력해주세요`;
    case "email":
      return `이메일을 입력해주세요`;
    case "password":
      return `4~12자 이내로 입력해주세요`;
    case "confirm":
      return `비밀번호를 한번더 입력해주세요`;
    case "local":
      return `시(군) 이름을 2글자로 입력해주세요`;
    default:
      return "";
  }
}
// Form => OK ? GOTO Login Page
