import React, { useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Form from "./components/Form/Form";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import Result from "./components/Result/Result";
import { ResultProvider } from "./context/ResultContext";
import { UserProvider } from "./context/UserContext";

const mainLists = ["계산기", "로그인"];

function App() {
  //header부분의 style을 위해
  const [mainList, setMainList] = useState(mainLists[0]);
  //계산기일 경우, 값을 입력전인지 후인지 여부에 따라 다른 화면 호출
  const [showResult, setShowResult] = useState(false);
  return (
    <>
      <Header
        mainLists={mainLists}
        mainList={mainList}
        setMainList={setMainList}
        setShowResult={setShowResult}
      />
      <ResultProvider>
        {mainList === mainLists[0] && !showResult && (
          <Form setShowResult={setShowResult} />
        )}
        {mainList === mainLists[0] && showResult && <Result />}
      </ResultProvider>
      <UserProvider>{mainList === mainLists[1] && <Login />}</UserProvider>
      <Footer />
    </>
  );
}

export default App;
