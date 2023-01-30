import React, { useContext, useEffect, useState } from "react";
import { getAllReports } from "../../api/reports";
import { ResultContext } from "../../context/ResultContext";
import EachReport from "../EachReport/EachReport";

export default function Result() {
  const [dataLen, setDataLen] = useState(0);
  useEffect(() => {
    getAllReports()
      .then((data) => setDataLen(data.data.data.length))
      .catch(() =>
        alert("시스템에 오류가 생겨서 총데이터 개수를 불러오지 못했습니다.")
      );
  }, [dataLen]);
  const { result } = useContext(ResultContext);

  return (
    <section>
      <p>
        계산 완료<span>(총 {dataLen}개의 데이터)</span>
      </p>
      <EachReport result={result} />
    </section>
  );
}
