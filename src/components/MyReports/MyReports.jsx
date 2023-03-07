import React, { useCallback, useEffect, useState } from "react";
import * as reportsAPI from "../../api/reports.js";
import { getUserInfo } from "../../api/userInfo.js";
import * as usersAPI from "../../api/users.js";
import { useResult } from "../../context/ResultContext.jsx";
import EachFilterd from "../EachFilterd/EachFilterd.jsx";
import EachReport from "../EachReport/EachReport.jsx";
import styles from "./MyReports.module.css";
import { AiFillBackward } from "react-icons/ai";
import Select from "../Select/Select.jsx";

export default React.memo(function MyReports() {
  const [reports, setReports] = useState([]);
  const [userId, setUserId] = useState("");
  const [showEachReport, setShowEachReport] = useState(false);
  const { result } = useResult();
  const [input, setInput] = useState("");
  const [mainLoading, setMainLoading] = useState(false);

  // METHOD
  const getYearLists = useCallback(() => {
    const today = new Date();
    const year = today.getFullYear();
    // const month = today.getMonth() + 1;
    return [
      "전부",
      (year - 2).toString(),
      (year - 1).toString(),
      year.toString(),
    ];
  }, []);
  // METHOD END

  const yearLists = getYearLists();

  useEffect(() => {
    async function getReports() {
      setMainLoading(true);
      try {
        const response = await reportsAPI.getAllReports();
        setReports(response.data.data);
        const response2 = await usersAPI.getAllUsers();
        const user = response2.data.find(
          (user) => user.email === getUserInfo().email
        );
        setUserId(user.id);
        setMainLoading(false);
      } catch (e) {
        console.error(e);
      }
    }
    getReports();
  }, []);

  const onClick = useCallback(() => setShowEachReport(false), []);
  const onSelect = useCallback((e) => setInput(e.target.value), []);

  return (
    <section className={styles.container}>
      {showEachReport ? (
        <>
          <div className={styles.subtitle}>
            <>
              <button className={styles.button} onClick={onClick}>
                <AiFillBackward />
                <span className={styles.back}>뒤로가기</span>
              </button>
            </>
            이용사료: {result.company}
          </div>
          <EachReport result={result} />
        </>
      ) : (
        <>
          <div className={styles.title}>
            <span className={styles.bigtitle}>
              {getUserInfo().name}님의 DATA
            </span>
            <span className={`${styles.bigtitle} ${styles.select}`}>
              <Select onSelect={onSelect} lists={yearLists} isDate />
            </span>
          </div>
          <EachFilterd
            setReports={setReports}
            reports={reports}
            userId={userId}
            setShowEachReport={setShowEachReport}
            input={input}
            mainLoading={mainLoading}
          />
        </>
      )}
    </section>
  );
});
