import React, { useState, useEffect } from "react";
import { useResult } from "../../context/ResultContext";
import { transValue } from "../EachReport/EachReport";
import styles from "./EachFilterd.module.css";
import { useLoading } from "../../context/loadingContext";
import { RiDeleteBinLine } from "react-icons/ri";
import * as reportsAPI from "../../api/reports.js";

export default function EachFilterd({
  setReports,
  reports,
  userId,
  setShowEachReport,
  input,
  users,
}) {
  const [filterd, setFilterd] = useState([]);
  const { setResult } = useResult();
  const { initState, loadingState, loading } = useLoading();
  useEffect(() => {
    initState();
    loadingState();

    let processing = reports;

    if (!(reports && userId)) {
      processing = [];
    } else if (userId !== "1") {
      processing = reports.filter((report) => report.userId === userId);
      if (input && input !== "전부") {
        processing = processing.filter(
          (fr) => getYearFromDateStr(fr.createdAt) === input
        );
      }
    } else {
      for (let i = 0; i < users.length; i++) {
        const matchId = users[i].id;
        const matchName = users[i].name;
        processing = processing.map((p) =>
          p.userId === matchId ? { ...p, name: matchName } : p
        );
      }
      if (input) {
        processing = processing.filter((fr) => fr.company === input);
      }
    }
    setFilterd(processing);
    initState();
    //
    // if (!(reports && userId)) {
    //   initState();
    // } else if (reports && userId === "1") {
    //   getUsersFunction();
    // } else {
    //   let processing = reports.filter((report) => report.userId === userId);
    //   if (input && input !== "전부") {
    //     processing = processing.filter(
    //       (fr) => getYearFromDateStr(fr.createdAt) === input
    //     );
    //   }
    //   setFilterd(processing);
    //   initState();
    // }
  }, [reports, initState, loadingState, userId, input, users]);

  const onClick = (id) => {
    const loginResult = filterd.find((filter) => filter.id === id);
    setResult(loginResult);
    setShowEachReport(true);
  };
  const onDelClick = (id) => {
    const isDelete = window.confirm("정말로 삭제하시겠습니까?");
    if (!isDelete) return;
    reportsAPI
      .removeReport(id)
      .then(async () => {
        const response = await reportsAPI.getAllReports();
        setReports(response.data.data);
        alert("삭제하였습니다.");
      })
      .catch(() => alert("삭제실패. 관리자에게 문의해주세요."));
  };
  if (loading)
    return <div className={styles.container}>데이터를 불러오는 중입니다..</div>;
  return (
    <ul className={styles.lists}>
      <li className={`${styles.list} ${styles.maintitle}`}>
        <span className={styles.title}>계산일</span>
        {userId === "1" ? (
          <>
            <span className={styles.secondtitle}>사료</span>
            <span className={styles.secondtitle}>이름</span>
          </>
        ) : (
          <span className={styles.secondtitle}>입추수</span>
        )}
        <span className={styles.subtitle}>효율</span>
        <span className={styles.deltitle}>삭제</span>
      </li>
      {filterd.map((filter) => (
        <li className={styles.list} key={filter.id}>
          <div className={styles.listdiv} onClick={() => onClick(filter.id)}>
            <span className={styles.title}>
              {parseDatetoStr(filter.createdAt)}
            </span>
            {userId === "1" ? (
              <>
                <span className={styles.secondtitle}>{filter.company}</span>
                <span className={styles.secondtitle}>{filter.name}</span>
              </>
            ) : (
              <span className={styles.secondtitle}>
                {transValue(filter.inCount, 0)}수
              </span>
            )}
            <span className={styles.subtitle}>
              {transValue(filter.feedEfficiency, 3)}
            </span>
          </div>
          <div className={styles.btndiv}>
            <button
              className={styles.button}
              onClick={() => onDelClick(filter.id)}
            >
              <RiDeleteBinLine />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

function parseDatetoStr(dateString) {
  const date = dateString.split("-");
  const year = date[0];
  const month = date[1];
  const day = date[2].slice(0, 2);
  return `${year}년 ${month}월 ${day}일`;
}
function getYearFromDateStr(dateString) {
  const date = dateString.split("-");
  const year = date[0];
  return year;
}
