import React, { useLayoutEffect } from "react";
import { useLoaderData, useLocation } from "react-router-dom";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { FaArrowLeft} from "react-icons/fa";

const ResultPage = () => {

  const data = useLoaderData();
  const location = useLocation();

  useLayoutEffect(() => {
    console.log(data);
  }, [location]);

  return (
    <section className='section result' id='result'>
      <div className='result-grid'>
        <div className='grid-20'>
        <a style={{ fontSize: "20px" }} href={`/campaign/${data.address}/stats`}> 
          <button className='btn-theme'><FaArrowLeft className="listing-btn" /></button>
          </a>
        </div>
        <div className='grid-60 result-head'>
          <p>Voting results</p>
        </div>
        <div className='grid-20'></div>
        <div className='grid-100 result-section'>
          <div className='grid-30 result-doughnut'>
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
      <span>Voting chart</span>
          </div>
          <div className="grid-70 result-text">
            <div className="grid-100">
              <span>Contract - {data.address} </span>
            </div>
            <div className="grid-100">
              <span>Stage - {data.stage} </span>
            </div>
            <div className="grid-50">
              <span className="green">Yes - {data.yes} </span>
            </div>
            <div className="grid-50">
              <span className="red">No - {data.no} </span>
            </div>
            <div className="grid-100">
              <p>
                Voting ends in: {data.deadline.days} day(s) {data.deadline.hours}{" "} hour(s)
                </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ResultPage