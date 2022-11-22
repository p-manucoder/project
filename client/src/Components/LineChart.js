import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Year", "Posts", "Premium Posts", "Reported Posts"],
  ["2004", 1000, 890, 400],
  ["2005", 1170, 690, 460],
  ["2006", 660, 770, 1120],
  ["2007", 1030, 450, 540],
];

export const options = {
  title: "No of Posts ,Premium Posts,Reported Posts",
  curveType: "function",
  legend: { position: "bottom" },
};

export function LineChart() {
  return (
    <Chart
      chartType="LineChart"
      width="38vw"
      className="p-1 m-2"
      height="400px"
      data={data}
      options={options}
    />
  );
}
