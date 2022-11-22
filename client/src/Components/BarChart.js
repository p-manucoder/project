import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Date", "Visitors"],
  ["2014-12-22", 1000],
  ["2015-03-22", 1170],
  ["2016-09-12", 660],
  ["2017-04-17", 1030],
  ["2014-12-22", 1000],
  ["2015-03-22", 1170],
  ["2016-09-12", 660],
  ["2017-04-17", 1030],
];

export const options = {
  chart: {
    title: "Total Visitors",
  },
};

export function BarChart() {
  return (
    <Chart
      chartType="Bar"
      width="40vw"
      height="400px"
      data={data}
      className="p-1 m-2"
      options={options}
    />
  );
}
