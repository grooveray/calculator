import React, { useEffect, useState } from "react";
import { getUserInfo } from "../../api/userInfo.js";
import * as userAPI from "../../api/users.js";
import EachInfo from "../EachInfo/EachInfo.jsx";
import styles from "./MyPage.module.css";
import { GrUpdate } from "react-icons/gr";

export default function MyPage() {
  const [user, setUser] = useState();

  useEffect(() => {
    async function getUsers() {
      try {
        const userInfo = getUserInfo();
        const reponse = await userAPI.getAllUsers();
        const found = reponse.data.find(
          (user) => user.email === userInfo.email
        );
        setUser(found);
      } catch (e) {
        console.error(e);
      }
    }
    getUsers();
  }, []);
  if (!user) return <div className={styles.container}>로딩중입니다...</div>;
  return (
    <section className={styles.container}>
      <div className={styles.title}>
        마이페이지
        <span className={styles.subtitle}>
          (수정할 항목의 {<GrUpdate />}을 누르세요)
        </span>
      </div>
      <EachInfo user={user} />
    </section>
  );
}
