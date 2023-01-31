import React, { useState } from "react";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Form from "./components/Form/Form";
import Header from "./components/Header/Header";
import Result from "./components/Result/Result";
import { ResultProvider } from "./context/ResultContext";

const mainLists = ["계산기", "로그인"];

function App() {
  const [mainList, setMainList] = useState(mainLists[0]);
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
      {mainList === mainLists[1] && <div>Login Page</div>}
      <Footer />
    </>
  );
}

export default App;
