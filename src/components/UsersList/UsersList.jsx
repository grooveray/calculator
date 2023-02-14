import React, { useState } from "react";
import styles from "./UsersList.module.css";
import { RiDeleteBinLine } from "react-icons/ri";
import { SiDatabricks } from "react-icons/si";
import EachReport from "../EachReport/EachReport";
import EachFilterd from "../EachFilterd/EachFilterd";
import { useResult } from "../../context/ResultContext";

export default function UsersList({ reports, users, onClick, onDelClick }) {
  const [adminReports, setAdminReports] = useState([]);
  const [adminUserId, setAdminUserId] = useState("");
  const [showFilterReports, setShowFilterReports] = useState(false);
  const [showEachReport, setShowEachReport] = useState(false);
  const { result } = useResult();
  const filterd = filterdArray(users, reports);
  const onDataClick = (userId, filterdData) => {
    setAdminUserId(userId);
    setAdminReports(filterdData);
    setShowFilterReports(true);
  };
  return showEachReport && showFilterReports ? (
    <EachReport result={result} setShowEachReport={setShowEachReport} />
  ) : !showEachReport && showFilterReports ? (
    <EachFilterd
      setReports={setAdminReports}
      reports={adminReports}
      userId={adminUserId}
      setShowEachReport={setShowEachReport}
    />
  ) : (
    <ul className={styles.lists}>
      <li className={`${styles.list} ${styles.maintitle}`}>
        <span className={styles.title}>가입일</span>
        <span className={styles.secondtitle}>이름</span>
        <span className={styles.subtitle}>데이터수</span>
        <span className={styles.deltitle}>데이터</span>
        <span className={styles.deltitle}>삭제</span>
      </li>
      {filterd.map((filter) => (
        <li className={styles.list} key={filter.id}>
          <div className={styles.listdiv} onClick={() => onClick(filter.id)}>
            <span className={styles.title}>
              {parseDatetoStr(filter.createdAt)}
            </span>
            <span className={styles.secondtitle}>{filter.name}</span>
            <span className={styles.subtitle}>{filter.data.length || 0}개</span>
          </div>
          <div className={styles.btndiv}>
            <button
              className={styles.button}
              onClick={() => onDataClick(filter.id, filter.data)}
            >
              <SiDatabricks />
            </button>
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
function filterdArray(users, reports) {
  let newUsers = users.map((user) => ({ ...user, data: [] }));
  for (let i = 0; i < reports.length; i++) {
    const userId = reports[i].userId;
    newUsers = newUsers.map((user) =>
      user.id === userId ? { ...user, data: [...user.data, reports[i]] } : user
    );
  }
  return newUsers;
}
