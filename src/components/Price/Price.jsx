import React, { useEffect, useState } from "react";
import styles from "./Price.module.css";
import * as reportsApi from "../../api/reports.js";

export default React.memo(function Price() {
  const [price, setPrice] = useState([]);
  useEffect(() => {
    const getData = async () => {
      reportsApi.getPriceData().then((data) => setPrice(data.data.data));
    };
    getData();
  }, []);
  return (
    <section className={styles.container}>
      <div className={styles.title}>
        <p>
          육계시세정보를 <b>한눈에 모아 볼 수 있는</b> 페이지 입니다.
        </p>
        <p>
          <i>
            <b>대닭 기준</b>
          </i>{" "}
          으로 작성되었으며,
        </p>
        <p>출처 사이트 상황에 따라 일부 가격정보가 나오지 않을 수 있음.</p>
      </div>
      {!price || !price.length ? (
        <div>가격정보를 수집하는 중입니다.</div>
      ) : (
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th></th>
              <th>기준일</th>
              <th>금일</th>
              <th>전일</th>
              <th>병아리</th>
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {price.length &&
              price.map((p, index) => (
                <tr key={index}>
                  <td>
                    {index === 0 ? (
                      <a
                        href="https://www.poultry.or.kr/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        📎 양계협회시세
                      </a>
                    ) : index === 1 ? (
                      <a
                        href="http://www.hkjm.co.kr/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        📎 한국정보문화
                      </a>
                    ) : (
                      "유통시세 (예측)"
                    )}
                  </td>
                  <td>{p.date}</td>
                  <td>{p.price}</td>
                  <td>{p.prevPrice}</td>
                  <td>{p.chickPrice}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </section>
  );
});
