import React, { useCallback, useEffect, useState } from "react";
import styles from "./EachInfo.module.css";
import { GrUpdate } from "react-icons/gr";
import { AiFillLock } from "react-icons/ai";
import { updateUser } from "../../api/users";

export default React.memo(function EachInfo({ user, isSuperAdmin }) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const { id, name, email, local, phone, admin } = user;
    const lists = [
      { text: "이름", value: name, name: "name", userId: id },
      { text: "지역", value: local, name: "local", userId: id },
      { text: "이메일", value: email, name: "email", userId: id },
      { text: "전화", value: phone, name: "phone", userId: id },
      { text: "관리자", value: admin, name: "admin", userId: id },
    ];
    if (isSuperAdmin) {
      return setUsers(lists);
    } else {
      return setUsers(lists.filter((list) => list.value !== admin));
    }
  }, [user, isSuperAdmin]);
  const onClick = useCallback(
    async (userId, name, value) => {
      const newValue = prompt(`수정할 ${name}을 입력해주세요.`, value);
      //validation
      const response = await updateUser(userId, name, newValue);
      if (!response)
        return alert("문제가 발생했습니다. 관리자에게 문의하세요.");
      setUsers(
        users.map((user) =>
          user.name === name ? { ...user, value: newValue } : user
        )
      );
      return alert("정보가 성공적으로 수정되었습니다.");
      //response.data.updated 가 유저정보임
    },
    [users]
  );
  const onBtnClick = useCallback(async (userId) => {
    const password = prompt("기존의 비밀번호를 입력해주세요.", "");
    const newValue = prompt(`수정할 비밀번호를 입력해주세요.`, "");
    const confirm = prompt(`수정할 비밀번호를 한번더 입력해주세요.`, "");
    if (newValue !== confirm) return alert("비밀번호 확인이 다릅니다.");
    //validation
    const response = await updateUser(userId, "password", newValue, password);
    if (!response) return alert("기존의 비밀번호를 다시 한번 확인해주세요.");
    return alert("정보가 성공적으로 수정되었습니다.");
    //response.data.updated 가 유저정보임
  }, []);
  return (
    <ul className={styles.lists}>
      {users.map((user, index) => (
        <li className={styles.list} key={index}>
          <span className={styles.title}>{user.text}</span>
          <span className={styles.subtitle}>{user.value}</span>
          <button
            className={styles.button}
            onClick={() => onClick(user.userId, user.name, user.value)}
          >
            <GrUpdate />
          </button>
        </li>
      ))}
      <li className={styles.list}>
        <span className={styles.title}>비밀번호</span>
        <span className={styles.subtitle}>
          <AiFillLock />
        </span>
        <button className={styles.button} onClick={() => onBtnClick(user.id)}>
          <GrUpdate />
        </button>
      </li>
    </ul>
  );
});
