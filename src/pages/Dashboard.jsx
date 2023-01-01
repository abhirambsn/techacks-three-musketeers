import React from "react";
import { useLoaderData } from "react-router-dom";
import { formatAddress } from "../utils/functions";

const Dashboard = () => {
  const dt = useLoaderData();
  return (
    <div>
      <h1>Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th scope="col">S. No.</th>
            <th scope="col">Address</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Stage Period</th>
            <th scope="col">Total Duration</th>
            <th scope="col">Current Stage</th>
            <th scope="col">Progress (Amount Recieved / Amount needed) (in ETH)</th>
            <th scope="col">Deadline</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {dt.map((dt, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{formatAddress(dt.address)}</td>
              <td>{dt.name}</td>
              <td>{dt.desc}</td>
              <td>{dt.stagePeriod / 60 / 60 / 24} days</td>
              <td>{dt.totalProjectTime / 60 / 60 / 24} days</td>
              <td>{dt.currentStage} / {dt.totalProjectTime / dt.stagePeriod}</td>
              <td>{dt.currentProgress} / {dt.totalAmountNeeded} ETH ({(dt.currentProgress / dt.totalAmountNeeded)*100} %)</td>
              <td>{dt.projectDeadline}</td>
              <td>
                <button>Fund Campaign</button>
                <button>Vote to withdraw</button>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
