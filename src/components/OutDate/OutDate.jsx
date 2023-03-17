import React, { useCallback, useState } from "react";
import * as calculateAPI from "../../api/reports";
import { transValue } from "../EachReport/EachReport";
import Input from "../Input/Input";
import Select from "../Select/Select";
import styles from "./OutDate.module.css";
//something
const initialState = {
  startDay: "",
  feedEfficiency: 0,
  nowCount: 0,
  feedAmount: 0,
};
const labels = [
  { id: "1", name: "feedEfficiency", text: "사료효율" },
  { id: "2", name: "nowCount", text: "현재수수" },
  { id: "3", name: "feedAmount", text: "누적사료량" },
];
const outDateLists = [27, 28, 29, 30, 31, 32, 33, 34, 35, 36];

export default React.memo(function OutDate() {
  const [inputs, setInputs] = useState(initialState);
  const [showDatas, setShowDatas] = useState(false);
  // STATE MANAGEMENT
  const [datas, setDatas] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // STATE MANAGEMENT END

  const onChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setInputs({
        ...inputs,
        [name]: parseFloat(value),
      });
    },
    [inputs]
  );
  const onSelect = useCallback(
    (e) => {
      const { value } = e.target;
      setInputs({ ...inputs, startDay: parseFloat(value) });
    },
    [inputs]
  );
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const { feedEfficiency, feedAmount, nowCount, startDay } = inputs;

      const getDatas = async () => {
        if (!feedEfficiency || !feedAmount || !nowCount || !startDay)
          return alert("전부 입력해주세요.");
        if (feedEfficiency < 1.1 || feedEfficiency > 2.0)
          return alert("사료효율값이 잘못 입력되었습니다.");
        setDatas();
        setLoading(true);
        setError(null);
        try {
          const response = await calculateAPI.getGuessData({
            feedEfficiency,
            feedAmount,
            nowCount,
            startDay,
          });
          setDatas(response.data.data);
          setLoading(false);
          setShowDatas(true);
        } catch (e) {
          setError(e);
        }
      };
      getDatas();
    },
    [inputs]
  );
  if (loading)
    return <div className={styles.container}>계산하는 중입니다..</div>;
  if (error)
    return <div className={styles.container}>에러가 발생했습니다.</div>;
  return (
    <>
      {showDatas ? (
        <ul className={styles.lists}>
          <li className={`${styles.list} ${styles.maintitle}`}>
            <span className={styles.title}>예상출하일</span>
            <span className={styles.secondtitle}>예상중량</span>
            <span className={styles.subtitle}>필요사료량</span>
          </li>
          {datas.map((data) => (
            <li key={data.endDay} className={styles.list}>
              <span className={styles.title}>{data.endDay}일</span>
              <span className={styles.secondtitle}>
                {transValue(data.guessBody, 3)}kg
              </span>
              <span className={styles.subtitle}>
                {transValue(data.feedAmount, 1)}톤
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <form className={styles.form} onSubmit={onSubmit}>
          <Select onSelect={onSelect} lists={outDateLists} isGuess />
          {labels.map((label) => (
            <Input
              key={label.id}
              label={label}
              onChange={onChange}
              inputs={inputs}
            />
          ))}
          <button className={styles.button}>계산하기</button>
          <div className={styles.alert}>
            현재 테스트중인 서비스입니다. 맞지 않는 부분에 대하여 연락주시면
            감사하겠습니다.
          </div>
        </form>
      )}
    </>
  );
});
