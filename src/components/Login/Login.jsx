import React, { useState } from "react";
import * as usersRepository from "../../api/users.js";
import LoginForm from "../LoginForm/LoginForm";
import { getToken } from "../../api/token";
import styles from "./Login.module.css";
import Description from "../Description/Description";
import LoginFooter from "../LoginFooter/LoginFooter";
import { useLoading } from "../../context/loadingContext.jsx";
import { useNavigate } from "react-router-dom";

const initialInputs = { email: "", password: "" };

export default function Login() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState(initialInputs);
  const { loading, error, initState, loadingState, errorState } = useLoading();

  const { email, password } = inputs;
  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!(email && password)) return alert("입력하지 않은 항목이 있습니다.");
    initState();
    usersRepository
      .loginUser(email, password) //
      .then((response) => {
        loadingState();
        if (response.status === 401) {
          setInputs(initialInputs);
          initState();
          return alert("유저정보가 올바르지 않습니다.");
        }
        // window.location.reload();
        navigate("/");
      }) //
      .catch((e) => {
        errorState();
        return alert("시스템에 오류가 있습니다. 관리자에게 문의하세요.");
      }); //
  };
  if (loading)
    return (
      <div className={styles.container}>유저정보를 확인하는 중입니다..</div>
    );
  if (error)
    return <div className={styles.container}>에러가 발생했습니다.</div>;
  return (
    <section className={styles.container}>
      {!getToken() && <Description />}
      {!getToken() && (
        <LoginForm inputs={inputs} onChange={onChange} onSubmit={onSubmit} />
      )}
      {!getToken() && <LoginFooter />}
      {/* {getToken() && <div>Login success</div>} */}
    </section>
  );
}
