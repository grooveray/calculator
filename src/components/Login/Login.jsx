import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import * as usersRepository from "../../api/users.js";
import LoginForm from "../LoginForm/LoginForm";

const initialInputs = { email: "", password: "" };

export default function Login() {
  const [inputs, setInputs] = useState(initialInputs);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { email, password } = inputs;
  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const { user, setUser } = useContext(UserContext);
  const onSubmit = (e) => {
    e.preventDefault();
    if (!(email && password)) return alert("입력하지 않은 항목이 있습니다.");
    setLoading(true);
    setError(false);
    usersRepository
      .loginUser(email, password) //
      .then((data) => {
        setLoading(false);
        if (!data) {
          setInputs(initialInputs);
          return alert("유저정보가 올바르지 않습니다.");
        }
        setUser(data.data);
      }) //
      .catch((e) => {
        setLoading(false);
        setError(true);
        console.error(e);
      }); //
  };
  console.log("Authorization");
  if (loading) return <div>유저정보를 확인하는 중입니다..</div>;
  if (error) return <div>에러가 발생했습니다.</div>;
  return (
    <>
      {user ? (
        <div>111</div>
      ) : (
        <LoginForm inputs={inputs} onChange={onChange} onSubmit={onSubmit} />
      )}
    </>
  );
}
