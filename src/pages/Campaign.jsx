import React, { useLayoutEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useLoaderData, useLocation } from "react-router-dom";
import { checkInvestorship, fund, registerAsInvestor } from "../utils/interact";
import useAccount from "../hooks/useAccount";
import useProvider from "../hooks/useProvider";
import { getDaysFromDeadline, getMaticToINRPrice } from "../utils/functions";

const Campaign = () => {
  const campaignData = useLoaderData();
  const provider = useProvider();
  const { address } = useAccount(provider);
  const [fundAmount, setFundAmount] = useState(0);
  const [registered, setRegistered] = useState(false);
  const [maticPrice, setMaticPrice] = useState(0);
  const location = useLocation();

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
                {((campaignData.currentProgress /
                  campaignData.totalAmountNeeded) *
                  100).toFixed(2)}
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Campaign;
