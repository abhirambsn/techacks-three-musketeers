import React, { useLayoutEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useLoaderData, useLocation } from "react-router-dom";
import {
  cancelCampaign,
  checkInvestorship,
  fund,
  registerAsInvestor,
  withdraw,
} from "../utils/interact";
import useAccount from "../hooks/useAccount";
import useProvider from "../hooks/useProvider";
import { getDaysFromDeadline, getMaticToINRPrice } from "../utils/functions";

const TestingCampaign = () => {
  const campaignData = useLoaderData();
  const provider = useProvider();
  const { address } = useAccount(provider);
  const [fundAmount, setFundAmount] = useState(0);
  const [registered, setRegistered] = useState(false);
  const [maticPrice, setMaticPrice] = useState(0);
  const location = useLocation();

  console.log(campaignData);

  useLayoutEffect(() => {
    if (!window.ethereum) {
      return;
    }
    var element = document.getElementsByClassName("campaign-progress")[0];
    var w = element.dataset.progress;
    if (w >= 100) {
      w = 100;
    }
    element.style.width = `${w}%`;
    (async () => {
      if (!address) return;
      setRegistered(await checkInvestorship(campaignData.address, address));
      if (maticPrice == 0) {
        setMaticPrice(await getMaticToINRPrice());
      }
    })();
  }, [location, window.ethereum, address]);
  return (
    <section className="section campaign" id="campaign">
      <div className="campaign-grid">
        <div className="grid-40">
          <a href="/">
            <button className="btn-theme">
              {" "}
              <FaArrowLeft className="campaign-btn" /> Home
            </button>
          </a>
        </div>
        <div className="grid-60 campaign-head">
          <p>{campaignData.name}</p>
        </div>
        <div className="grid-50 campaign-img">
          <div className="campaign-img-upper"></div>
          <img src="https://picsum.photos/400/300" alt="" />
          <div className="campaign-img-lower"></div>
        </div>
        <div className="grid-50">
          <div className="campaign-desc">
            <div className="campaign-desc-head">
              <span>Description - </span>
            </div>
            <div className="campaign-desc-text">
              <p>{campaignData.desc}</p>
            </div>

            <div className="campaign-desc-stats">
              <div className="grid-100">
                <input
                  type="number"
                  disabled={!registered}
                  value={fundAmount}
                  onChange={(e) => setFundAmount(e.target.value)}
                />{" "}
                {/* TODO: Style this :) */}
                <p>INR: {(maticPrice * fundAmount).toFixed(2)} INR</p>
              </div>
              <div className={registered ? "grid-100" : "grid-50"}>
                <button
                  className="btn-theme"
                  onClick={async () =>
                    await fund(campaignData.address, address, fundAmount)
                  }
                >
                  Fund this campaign
                </button>
              </div>
              {!registered && (
                <div className="grid-50">
                  <button
                    className="btn-theme"
                    onClick={async () =>
                      await registerAsInvestor(campaignData.address)
                    }
                  >
                    Register as Investor
                  </button>
                </div>
              )}
              {registered && (
                <div className="grid-100">
                  <button
                    onClick={async () =>
                      await withdraw(campaignData.address, address)
                    }
                  >
                    Withdraw Funds
                  </button>
                </div>
              )}

              {campaignData.author == address && (
                <div className="grid-100">
                  <button
                    onClick={async () => {
                      const confirmation = confirm(
                        "Are you sure? This will refund the funds to all your investors and create a negative impact on your profile!"
                      );
                      if (confirmation) {
                        await cancelCampaign(campaignData.address);
                        alert("Campaign now stands cancelled");
                      } else {
                        alert("Request Cancelled");
                      }
                    }}
                  >
                    Cancel Campaign
                  </button>
                </div>
              )}

              {campaignData.author == address && (
                <div className="grid-100">
                  <button
                    onClick={async () => {
                      const confirmation = confirm(
                        "Confirm Release of the funds"
                      );
                      if (confirmation) {
                        await cancelCampaign(campaignData.address);
                        alert("Campaign now stands cancelled");
                      } else {
                        alert("Request Cancelled");
                      }
                    }}
                  >
                    Get Funds for the Stage
                  </button>
                </div>
              )}

              <div className="grid-100 campaign-progress-bar-holder">
                <div className="campaign-progress-bar"></div>
                <div
                  className="campaign-progress"
                  data-progress={
                    (campaignData.currentProgress /
                      campaignData.totalAmountNeeded) *
                    100
                  }
                ></div>
              </div>
              <div className="grid-100 campaign-progress-percent">
                Progress:{" "}
                {(
                  (campaignData.currentProgress /
                    campaignData.totalAmountNeeded) *
                  100
                ).toFixed(2)}
                % Funded
              </div>
              <div className="grid-100">
                Deadline: {campaignData.projectDeadline} (
                {getDaysFromDeadline(campaignData.projectDeadline)} days left)
              </div>
              <div className="grid-50">
                Target: {campaignData.totalAmountNeeded} MATIC
              </div>
              <div className="grid-50">
                Collected: {campaignData.currentProgress} MATIC
              </div>
              <div className="grid-50">
                Stage Period: {campaignData.stagePeriod / 60 / 60 / 24} days
              </div>
              <div className="grid-50">
                No of Stages:{" "}
                {Math.round(
                  campaignData.totalProjectTime / campaignData.stagePeriod
                )}
              </div>
              <div>
                <h2>Stage Details</h2>
                <table>
                  <thead>
                    <tr>
                      <th>S. No</th>
                      <th>Amount Needed</th>
                      <th>Deadline</th>
                      <th>Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaignData?.stages.map((stageData, i) => (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{stageData.amount}</td>
                        <td>
                          {stageData.deadline.toLocaleDateString("en-IN", {
                            dateStyle: "medium",
                          })}
                        </td>
                        <td>
                          {campaignData.currentStage == i + 1
                            ? "In Progress"
                            : "Not Started"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestingCampaign;
