import React, { useState, useEffect } from "react";
import * as reportsAPI from "../../api/reports.js";
import * as usersAPI from "../../api/users.js";
import { useResult } from "../../context/ResultContext";
import EachFilterd from "../EachFilterd/EachFilterd.jsx";
import EachReport from "../EachReport/EachReport.jsx";
import { companyLists } from "../Form/Form";
import Select from "../Select/Select";
import styles from "./OnDatas.module.css";
import { AiFillBackward, AiOutlineClear } from "react-icons/ai";

export default function OnDatas() {
  const [reports, setReports] = useState([]);
  const [users, setUsers] = useState([]);
  const [showEachReport, setShowEachReport] = useState(false);
  const { result } = useResult();
  const [input, setInput] = useState("");
  const [lists, setLists] = useState(companyLists);

  useEffect(() => {
    async function getReports() {
      try {
        const response = await reportsAPI.getAllReports();
        const response2 = await usersAPI.getAllUsers();
        setReports(response.data.data);
        setUsers(response2.data);
      } catch (e) {
        console.error(e);
      }
    }
    getReports();
  }, []);
  const onClick = () => setShowEachReport(false);
  const onSelect = (e) => setInput(e.target.value);
  const onFilterClear = () => {
    setLists(companyLists);
    setInput("");
  };

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
              필터해제
              <button className={styles.button} onClick={onFilterClear}>
                <AiOutlineClear />
              </button>
            </span>
            <span className={`${styles.bigtitle} ${styles.select}`}>
              <Select onSelect={onSelect} lists={lists} />
            </span>
          </div>
          <EachFilterd
            setReports={setReports}
            reports={reports}
            userId="1"
            setShowEachReport={setShowEachReport}
            input={input}
            users={users}
          />
        </>
      )}
    </section>
  );
}
