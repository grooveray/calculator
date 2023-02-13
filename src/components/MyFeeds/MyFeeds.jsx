import React, { useEffect, useState } from "react";
import Chart from "../Chart/Chart";
import styles from "./MyFeeds.module.css";
import * as reportsAPI from "../../api/reports.js";
import { companyLists } from "../Form/Form";

// [
// { date: 2020년03월, 수원: 1.22, 양주: 1.55},
// { date: 2020년04월, 수원: 1.22, 양주: 1.55}
// ]
// { date: 2022년2월, company: 수원, count: 10, average: 1.3}
// { date: 2022년2월, company: 양주, count: 8, average: 1.5}
export default function MyFeeds() {
  const [chart, setChart] = useState();

  useEffect(() => {
    async function getReports() {
      try {
        const response = await reportsAPI.getAllReports();
        const dataArray = readyToPassData(response.data.data);
        setChart(dataArray);
      } catch (e) {
        console.error(e);
      }
    }
    getReports();
  }, []);
  console.log(chart);
  return (
    <section className={styles.container}>
      <div className={styles.title}>사료업체별 효율변동추이</div>
      <Chart chart={chart} />
    </section>
  );
}

// function getAverageFromBundle(reports, company, date) {
//   //Get Reports
//   const processing = reports.map((report) => ({
//     id: report.id,
//     company: report.company,
//     createdAt: parseDatetoStr(report.createdAt),
//     feedEfficiency: report.feedEfficiency,
//   }));
//   //Filter as Company
//   const compBundle = processing
//     .filter((report) => report.company === company)
//     .filter((report) => report.createdAt === date);
//   if (!(compBundle && compBundle.length))
//     return { date, company, average: 0, count: 0 };
//   if (compBundle.length === 1)
//     return { date, company, average: compBundle[0].feedEfficiency, count: 1 };
//   const sum = compBundle
//     .map((c) => c.feedEfficiency)
//     .reduce((acc, curr) => {
//       return (acc += curr);
//     }, 0);
//   const count = compBundle.length;
//   const average = sum / count;
//   return { date, company, average, count };
// }
function parseDatetoStr(dateString) {
  const date = dateString.split("-");
  const year = date[0];
  const month = date[1];
  return `${year}년${month}월`;
}

function getAverageFromBundle(reports, date) {
  //Get Reports
  const processing = reports.map((report) => ({
    id: report.id,
    company: report.company,
    createdAt: parseDatetoStr(report.createdAt),
    feedEfficiency: report.feedEfficiency,
  }));
  //Filter as Company
  const compBundle = processing.filter((report) => report.createdAt === date);

  let middleData = { date };
  for (let i = 0; i < companyLists.length; i++) {
    if (!(compBundle && compBundle.length)) {
      middleData = { ...middleData, [companyLists[i]]: { fe: null, count: 0 } };
    } else if (compBundle.length === 1) {
      middleData = {
        ...middleData,
        [companyLists[i]]: {
          fe:
            companyLists[i] === compBundle[0].company
              ? compBundle[0].feedEfficiency.toFixed(3)
              : null,
          count: 1,
        },
      };
    } else {
      let average;
      const averageArr = compBundle
        .filter((bundle) => bundle.company === companyLists[i])
        .map((bundle) => bundle.feedEfficiency);
      if (!(averageArr && averageArr.length)) {
        average = null;
      } else if (averageArr.length === 1) {
        average = averageArr[0].toFixed(3);
      } else {
        average = (
          averageArr.reduce((acc, curr) => {
            return (acc += curr);
          }, 0) / averageArr.length
        ).toFixed(3);
      }
      middleData = {
        ...middleData,
        [companyLists[i]]: { fe: average, count: averageArr.length },
      };
    }
  }
  return middleData;
}

function getDateArray() {
  let data = [];
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const date = today.getDate();
  for (let i = 0; i < 12; i++) {
    const prodDate = new Date(year, month - [i], date);
    const dataToStr = JSON.stringify(prodDate);
    const dataToParse = JSON.parse(dataToStr);
    const completeData = parseDatetoStr(dataToParse);
    data.push(completeData);
  }
  return data;
}
function readyToPassData(reports) {
  const dateArr = getDateArray();
  let data = [];
  for (let i = 0; i < dateArr.length; i++) {
    const object = getAverageFromBundle(reports, dateArr[i]);
    data.push(object);
  }
  return data;
}
