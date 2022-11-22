import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Task", "Hours per Day"],
  ["Pets", 11],
  ["Human", 2],
  ["Vehicles", 2],
  ["Object", 2],
  ["Others", 7],
];

export const options = {
  title: "Khoj Posts",
};

export function PieChart() {
  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"38vw"}
      height={"400px"}
      className="p-1 m-2"
    />
  );
}
