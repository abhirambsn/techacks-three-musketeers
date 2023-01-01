import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { formatAddress } from "../utils/functions";
import { checkInvestorship, fund, registerAsInvestor } from "../utils/interact";
import useAccount from "../hooks/useAccount";
import useProvider from "../hooks/useProvider";

const Testing = () => {
  const dt = useLoaderData();
  const provider = useProvider();
  const [fundAmt, setFundAmt] = useState(0);
  const { address } = useAccount(provider);

  

  return (
    <div>
      <h1>Testing Page</h1>
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
            <th scope="col">
              Progress (Amount Recieved / Amount needed) (in ETH)
            </th>
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
              <td>
                {dt.currentStage} / {dt.totalProjectTime / dt.stagePeriod}
              </td>
              <td>
                {dt.currentProgress} / {dt.totalAmountNeeded} ETH (
                {(dt.currentProgress / dt.totalAmountNeeded) * 100} %)
              </td>
              <td>{dt.projectDeadline}</td>
              <td>
                <button onClick={() => registerAsInvestor(dt.address)}>Register as Investor</button>
                <button onClick={() => fund(dt.address, address, fundAmt)}>
                  Fund Campaign
                </button>
                <input
                  type="number"
                  placeholder="Enter Amount to Fund (in ETH)"
                  value={fundAmt}
                  onChange={(e) => setFundAmt(e.target.value)}
                />
                <button>Vote to withdraw</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Testing;
