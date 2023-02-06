import React from "react";
import { BiLogOut } from "react-icons/bi";
import { clearToken, getToken } from "../../api/token";
import { clearUserInfo } from "../../api/userInfo";
import { initialUserState, useUser } from "../../context/UserContext";
import styles from "./Header.module.css";

export default function Header({
  mainLists,
  mainList,
  setMainList,
  setShowResult,
  onCalcPage,
  onLoginPage,
}) {
  const { setUser } = useUser();
  const token = getToken();
  const onClick = (list) => {
    setMainList(list);
    if (list === "계산기") {
      setShowResult(false);
      onCalcPage();
    }
    if (list === "로그인") onLoginPage();
  };
  const onLogout = () => {
    clearToken();
    clearUserInfo();
    setUser(initialUserState);
    onCalcPage();
  };
  const filterdList = (mainLists) => {
    if (token) {
      return mainLists.filter((list) => list !== "로그인");
    } else {
      return mainLists.filter((list) => list === "계산기" || list === "로그인");
    }
  };
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
      <div>
        <button className={styles.logout} onClick={onLogout}>
          <BiLogOut />
        </button>
      </div>
    </header>
  );
}
