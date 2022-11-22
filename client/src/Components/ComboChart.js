import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Month", "Chats", "Messages"],
  ["2004/05", 165, 938],
  ["2005/06", 135, 1120],
  ["2006/07", 157, 1167],
  ["2007/08", 139, 1110],
  ["2008/09", 136, 691],
];

export const options = {
  title: "Daily New Chats vs Messages",
  vAxis: { title: "Number" },
  hAxis: { title: "Dates" },
  seriesType: "bars",
  series: { 5: { type: "line" } },
};

export function ComboChart() {
  return (
    <Chart
      chartType="ComboChart"
      width="38vw"
      height="400px"
      data={data}
      options={options}
      className="p-1 m-2"
    />
  );
}
