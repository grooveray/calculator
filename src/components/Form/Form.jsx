import React, { useContext, useState } from "react";
import { createReport } from "../../api/reports";
import { ResultContext } from "../../context/ResultContext";
import Input from "../Input/Input";
import Select from "../Select/Select";
import styles from "./Form.module.css";

const initialState = {
  company: "",
  day: 0,
  inCount: 0,
  outCount: 0,
  totalWeight: 0,
  feedAmount: 0,
};
const labels = [
  { id: "1", name: "day", text: "사육일수" },
  { id: "2", name: "inCount", text: "입추수수" },
  { id: "3", name: "outCount", text: "출하수수" },
  { id: "4", name: "totalWeight", text: "출하 총중량" },
  { id: "5", name: "feedAmount", text: "총 사료량" },
];

export default function Form({ setShowResult }) {
  const [inputs, setInputs] = useState(initialState);
  const { setResult } = useContext(ResultContext);
  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value ? parseFloat(value) : "" });
  };
  const onSelect = (e) => {
    const { value } = e.target;
    setInputs({ ...inputs, company: value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!inputs) return alert("모든 칸은 필수 입력사항입니다.");
    for (let i = 0; i < labels.length; i++) {
      if (!inputs[labels[i].name])
        return alert(labels[i].text + "(은)는 필수 입력사항입니다.");
    }
    if (!inputs.company) return alert("사료회사명 선택은 필수사항입니다.");

    const response = await createReport(inputs);
    if (!response) return alert("Data not Found");
    setResult(response.data.data);
    setShowResult(true);
  };
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <Select onSelect={onSelect} />
      {labels.map((label) => (
        <Input
          key={label.id}
          label={label}
          onChange={onChange}
          inputs={inputs}
        />
      ))}
      <button className={styles.button}>계산하기</button>
    </form>
  );
}
