import { NativeSelect } from "@mui/material";
import React from "react";
import { CartesianGrid, Legend, Line, Tooltip } from "recharts";
import { LineChart, XAxis, YAxis } from "recharts";


// const data = [
//   {
//     Email: "bob@bob.com",
//     FirstName: "a",
//     LastName: "a",
//     OverallRating: '2',
//     PollutionRating: '1',
//     SafetyRating: '5',
//     SurveyDate: "Mon Sept 18 2023 16:43:29 GMT-0400 (Eastern Daylight Time)",
//   },

//   {
//     Email: "bob@bob.com",
//     FirstName: "a",
//     LastName: "a",
//     OverallRating: '5',
//     PollutionRating: '5',
//     SafetyRating: '1',
//     SurveyDate: "Mon Oct 16 2023 16:43:29 GMT-0400 (Eastern Daylight Time)",
//   },

//   {
//     Email: "bob@bob.com",
//     FirstName: "a",
//     LastName: "a",
//     OverallRating: '3',
//     PollutionRating: '2',
//     SafetyRating: '3',
//     SurveyDate: "Mon Oct 25 2023 16:43:29 GMT-0400 (Eastern Daylight Time)",
//   },

//   {
//     Email: "bob@bob.com",
//     FirstName: "a",
//     LastName: "a",
//     OverallRating: '5',
//     PollutionRating: '4',
//     SafetyRating: '5',
//     SurveyDate: "Mon Oct 30 2023 16:43:29 GMT-0400 (Eastern Daylight Time)",
//   },
// ];
const CustomTooltip = ({ active, payload, label }) => {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${date.getDate()} ${monthNames[date.getMonth()]}`;
  };
  if (active) {
    // Customize the content and appearance of the tooltip here
    return (
      <div className="custom-tooltip ">
        <p>{`${formatDate(label)}`}</p>
        {payload.map((entry) => (
          <p key={entry.dataKey} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }

  return null;
};
const Chart = ({ GraphData }) => {
  const data = GraphData;
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${date.getDate()} ${monthNames[date.getMonth()]}`;
  };
  return (
    <>
      {data?.length > 0 && (
        <>
         

          <div className=" ps-0">
          <LineChart width={900} height={300} data={data}>
            <XAxis dataKey="SurveyDate" tickFormatter={formatDate} />
            <YAxis ticks={[0, 1, 2, 3, 4, 5]} />
            {/* <CartesianGrid stroke="#eee" strokeDasharray="5 5"/> */}
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="OverallRating"
              strokeWidth={2}
              stroke="skyblue"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="PollutionRating"
              strokeWidth={2}
              stroke="red"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="SafetyRating"
              strokeWidth={2}
              name="Safety Rating"
              stroke="green"
              dot={false}
            />
          </LineChart>
          </div>
        </>
      )}
    </>
  );
};

export default Chart;
