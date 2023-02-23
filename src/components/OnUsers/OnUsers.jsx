import React, { useCallback, useEffect, useState } from "react";
import styles from "./OnUsers.module.css";
import * as usersAPI from "../../api/users.js";
import * as reportsAPI from "../../api/reports.js";
import { AiFillBackward } from "react-icons/ai";
import { TiArrowBack } from "react-icons/ti";
import UsersList from "../UsersList/UsersList";
import MyPage from "../MyPage/MyPage";
// import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../../api/userInfo";

export default React.memo(function OnUsers({ setMainList }) {
  const [users, setUsers] = useState([]);
  const [reports, setReports] = useState([]);
  const [user, setUser] = useState({});
  const [showEachUser, setShowEachUser] = useState(false);
  const [showFilterReports, setShowFilterReports] = useState(false);
  const [showEachReport, setShowEachReport] = useState(false);

  // METHOD

  const getUsersFunction = useCallback(async () => {
    try {
      const response = await usersAPI.getAllUsers();
      return response.data;
    } catch (e) {
      console.error(e);
    }
  }, []);
  const getReportsFunction = useCallback(async () => {
    try {
      const response = await reportsAPI.getAllReports();
      return response.data.data;
    } catch (e) {
      console.error(e);
    }
  }, []);

  // METHOD END

  useEffect(() => {
    getReportsFunction()
      .then((data) => setReports(data))
      .catch(console.error);
    getUsersFunction()
      .then((data) => setUsers(data))
      .catch(console.error);
  }, [getReportsFunction, getUsersFunction]);

  const onClick = useCallback(
    (userId) => {
      const foundUser = users.find((user) => user.id === userId);
      setUser(foundUser);
      setShowEachUser(true);
    },
    [users]
  );
  const onBackClick = useCallback(() => setShowEachUser(false), []);
  const onDelClick = useCallback(() => alert("유저삭제는 안 할 거지롱~"), []);
  const onInitClick = useCallback(() => {
    setShowFilterReports(false);
    setShowEachReport(false);
  }, []);
  return (
    <section className={styles.container}>
      {showEachUser ? (
        <>
          <div className={styles.subtitle}>
            <>
              <button className={styles.button} onClick={onBackClick}>
                <AiFillBackward />
                <span className={styles.back}>뒤로가기</span>
              </button>
            </>
          </div>
          {getUserInfo().admin === "2" ? (
            <MyPage isUser={user} isSuperAdmin />
          ) : (
            <MyPage isUser={user} />
          )}
        </>
      ) : (
        <>
          <div className={styles.title}>
            <span className={styles.bigtitle}>
              유저정보 보기
              <button className={styles.button} onClick={onInitClick}>
                <TiArrowBack />
              </button>
            </span>
            <span className={`${styles.bigtitle} ${styles.select}`}>-</span>
          </div>
          <UsersList
            reports={reports}
            users={users}
            onClick={onClick}
            onDelClick={onDelClick}
            showFilterReports={showFilterReports}
            setShowFilterReports={setShowFilterReports}
            showEachReport={showEachReport}
            setShowEachReport={setShowEachReport}
          />
        </>
      )}
    </section>
  );
});
