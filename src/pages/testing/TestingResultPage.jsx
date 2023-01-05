import React, { useLayoutEffect } from "react";
import { useLoaderData, useLocation } from "react-router-dom";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const TestinResultPage = () => {
  const data = useLoaderData();
  const location = useLocation();

  useLayoutEffect(() => {
    console.log(data);
  }, [location]);
  return (
    <div>
      <h1>
        Result Page =&gt; Stage {data.stage} of Campaign: {data.address}
      </h1>
      <br />
      <br />

      <p style={{ fontSize: "30px" }}>
        Yes: <span style={{ color: "green" }}>{data.yes}</span>
      </p>
      <p style={{ fontSize: "30px" }}>
        No: <span style={{ color: "red" }}>{data.no}</span>
      </p>
      <br />
      <br />
      <Doughnut
        datasetIdKey="pie"
        data={{
          labels: ["Yes", "No"],
          datasets: [
            {
              label: "# of Votes",
              data: [data.yes, data.no],
              backgroundColor: [
                "rgba(54, 162, 235, 0.4)",
                "rgba(255, 10, 10, 0.4)",
              ],
            },
          ],
        }}
      />

      <h3>
        Voting ends in: {data.deadline.days} day(s) {data.deadline.hours}{" "}
        hour(s)
      </h3>
      <br />
      <a style={{ fontSize: "20px" }} href={`/campaign/${data.address}`}>
        Back
      </a>
    </div>
  );
};

export default TestinResultPage;
