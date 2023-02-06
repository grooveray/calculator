import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Form from "./components/Form/Form";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import Result from "./components/Result/Result";
import Signup from "./components/Signup/Signup";

const mainLists = [
  "계산기",
  "로그인",
  "내성적보기",
  "내성적조회",
  "사료별효율",
  "내정보",
];
function App() {
  let navigate = useNavigate();

  //header부분의 style을 위해
  const [mainList, setMainList] = useState(mainLists[0]);
  //계산기일 경우, 값을 입력전인지 후인지 여부에 따라 다른 화면 호출
  const [showResult, setShowResult] = useState(false);
  const onCalcPage = () => {
    navigate("/");
  };
  const onLoginPage = () => {
    navigate("/login");
  };

  return (
    <>
      <Header
        mainLists={mainLists}
        mainList={mainList}
        setMainList={setMainList}
        setShowResult={setShowResult}
        onCalcPage={onCalcPage}
        onLoginPage={onLoginPage}
      />
      <Routes>
        <Route
          path="/"
          element={
            showResult ? <Result /> : <Form setShowResult={setShowResult} />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
