import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Form from "./components/Form/Form";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import MyFeeds from "./components/MyFeeds/MyFeeds";
import MyPage from "./components/MyPage/MyPage";
import MyReports from "./components/MyReports/MyReports";
import OnDatas from "./components/OnDatas/OnDatas";
import OnUsers from "./components/OnUsers/OnUsers";
import OutDate from "./components/OutDate/OutDate";
import Result from "./components/Result/Result";
import Signup from "./components/Signup/Signup";

const mainLists = [
  "계산기",
  "출하예측",
  "로그인",
  "내성적보기",
  "사료별효율",
  "내정보",
];
function App() {
  let navigate = useNavigate();

  //header부분의 style을 위해
  const [mainList, setMainList] = useState(mainLists[0]);
  //계산기일 경우, 값을 입력전인지 후인지 여부에 따라 다른 화면 호출
  const [showResult, setShowResult] = useState(false);
  const onCalcPage = () => navigate("/");
  const onLoginPage = () => navigate("/login");
  const myReportsPage = () => navigate("/myreports");
  const myFeedsPage = () => navigate("/myfeeds");
  const myPage = () => navigate("/mypage");
  const onDatas = () => navigate("/ondatas");
  const onUsers = () => navigate("/onusers");
  const guessOutDatePage = () => navigate("/outdate");

  return (
    <>
      <Header
        mainLists={mainLists}
        mainList={mainList}
        setMainList={setMainList}
        setShowResult={setShowResult}
        onCalcPage={onCalcPage}
        onLoginPage={onLoginPage}
        myReportsPage={myReportsPage}
        myFeedsPage={myFeedsPage}
        myPage={myPage}
        onDatas={onDatas}
        onUsers={onUsers}
        guessOutDatePage={guessOutDatePage}
      />
      <Routes>
        <Route
          path="/"
          element={
            showResult ? <Result /> : <Form setShowResult={setShowResult} />
          }
        />
        <Route
          path="/login"
          element={
            <Login setMainList={setMainList} setShowResult={setShowResult} />
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/myreports" element={<MyReports />} />
        <Route path="/myfeeds" element={<MyFeeds />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/ondatas" element={<OnDatas />} />
        <Route
          path="/onusers"
          element={<OnUsers setMainList={setMainList} />}
        />
        <Route path="/outdate" element={<OutDate />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
