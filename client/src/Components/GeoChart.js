import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Country", "Posts"],
  ["Germany", 200],
  ["United States", 300],
  ["Brazil", 400],
  ["Canada", 500],
  ["France", 600],
  ["Russia", 700],
  ["India", 649],
];
export const options = {
  title: "Khoj Posts",
};

export function GeoChart() {
  return (
    <div>
      <b className="mx-2 my-2"> Geo Locations</b>
      <Chart
        chartEvents={[
          {
            eventName: "select",
            callback: ({ chartWrapper }) => {
              const chart = chartWrapper.getChart();
              const selection = chart.getSelection();
              if (selection.length === 0) return;
              const region = data[selection[0].row + 1];
            },
          },
        ]}
        chartType="GeoChart"
        options={options}
        width="38vw"
        height="400px"
        data={data}
        className="p-1 m-2"
      />
    </div>
  );
}
