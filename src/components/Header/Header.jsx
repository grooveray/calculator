import React, { useCallback } from "react";
import { BiLogOut } from "react-icons/bi";
import { clearToken, getToken } from "../../api/token";
import { clearUserInfo, getUserInfo } from "../../api/userInfo";
import { initialUserState, useUser } from "../../context/UserContext";
import styles from "./Header.module.css";
import { useLoading } from "../../context/loadingContext";

export default React.memo(function Header({
  mainLists,
  mainList,
  setMainList,
  setShowResult,
  onCalcPage,
  onLoginPage,
  myReportsPage,
  myFeedsPage,
  myPage,
  onDatas,
  onUsers,
}) {
  const { initState } = useLoading();
  const { setUser } = useUser();
  const token = getToken();
  const userInfo = getUserInfo();
  const onClick = useCallback(
    (list) => {
      setMainList(list);
      switch (list) {
        case "계산기":
          setShowResult(false);
          onCalcPage();
          break;
        case "로그인":
          onLoginPage();
          break;
        case "내성적보기":
          myReportsPage();
          break;
        case "사료별효율":
          myFeedsPage();
          break;
        case "내정보":
          myPage();
          break;
        case "데이터조회":
          onDatas();
          break;
        case "유저정보":
          onUsers();
          break;
        default:
          setShowResult(false);
          onCalcPage();
          break;
      }
    },
    [
      myFeedsPage,
      myPage,
      myReportsPage,
      onCalcPage,
      onDatas,
      onLoginPage,
      onUsers,
      setMainList,
      setShowResult,
    ]
  );
  const onLogout = useCallback(() => {
    clearToken();
    clearUserInfo();
    setUser(initialUserState);
    initState();
    onCalcPage();
    window.location.reload();
  }, [initState, onCalcPage, setUser]);
  const filterdList = useCallback(
    (mainLists) => {
      if (token) {
        if (getUserInfo().admin === "0") {
          return mainLists.filter((list) => list !== "로그인");
        } else {
          return ["사료별효율", "데이터조회", "유저정보"];
        }
      } else {
        return mainLists.filter(
          (list) => list === "계산기" || list === "로그인"
        );
      }
    },
    [token]
  );
  return (
    <header className={styles.container}>
      <ul className={styles.lists}>
        {filterdList(mainLists).map((list, index) => (
          <li key={index}>
            <button
              className={`${styles.button} ${
                list === mainList && styles.selected
              } ${token && styles.fontDown}`}
              onClick={() => onClick(list)}
            >
              {list}
            </button>
          </li>
        ))}
      </ul>
      {userInfo.name && (
        <>
          <div className={styles.name}>
            <p>Hello,</p>
            <p>{userInfo.name}</p>
          </div>
          <div className={styles.btnDiv}>
            <button className={styles.logout} onClick={onLogout}>
              <BiLogOut />
            </button>
          </div>
        </>
      )}
    </header>
  );
});
