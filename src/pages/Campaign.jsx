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
    <div className="grid-40 campaign-left">
      <div className="grid-50 padd-5">
        <a href="/list">
          <button className="btn-inverse">
            {" "}
            <FaArrowLeft className="campaign-btn" />
          </button>
        </a>
      </div>
      <div className="grid-50 padd-5"></div>
      <div className="grid-20"></div>
      <div className="grid-60">
        <div className="campaign-img">
          <img src="https://picsum.photos/400/300" alt="img-desc" />
        </div>
      </div>
      <div className="grid-20"></div>
      <div className="grid-20"></div>
      <div className="grid-60">
        <div className="campaign-progress-bar-holder">
          <div className="campaign-progress-bar"></div>
          <div className="campaign-progress" data-progress={ (campaignData.currentProgress /
            campaignData.totalAmountNeeded) * 100 }></div>
        </div>
        <div className="campaign-progress-percent">
          Progress:{" "}
          {((campaignData.currentProgress /
          campaignData.totalAmountNeeded) *
          100).toFixed(2)}
          % Funded
        </div>
      </div>
      <div className="grid-20"></div>
      <div className="grid-20"></div>
      <div className="grid-60 campaign-card-inverse">
        <div className="campaign-deadline">
          Deadline: {campaignData.projectDeadline} (
          {getDaysFromDeadline(campaignData.projectDeadline)} days left)
        </div>
        <div className="campaign-target">
          Target: {campaignData.currentProgress}/{campaignData.totalAmountNeeded} MATIC
        </div>
        <div className="campaign-no-of-stages">
            No. of stages: 4
        </div> 
        <div className="campaign-stage-period">
            Stage period: 100 days
        </div> 
      </div>
      <div className="grid-20"></div>
    </div>
    <div className="grid-60 campaign-right">
      <div className="campaign-head grid-100">
        <p>{campaignData.name}</p>
      </div>
      <div className="grid-100 campaign-desc">
        <div className="campaign-desc-head">
          <span>Description - </span>
        </div>
        <div className="campaign-desc-text">
          <p>{campaignData.desc}</p>
        </div>
      </div>
      <div className="grid-50 campaign-funds grid">
        <div className="grid-100 campaign-funds">
        {!registered && (
        <button className="btn-theme" onClick={async ()=>
          await registerAsInvestor(campaignData.address)
          }
          >
          Register as Investor
        </button>
      )}
        </div>
        <div className="grid-100 campaign-funds">
          <a href="/stats">
          <button className="btn-theme">View Stages</button>
          </a>
        </div>
      </div>
      <div className="grid-50 campaign-form">
        <div className="grid-100 campaign-funds">
          <input className="campaign-funds-input" type="number" disabled={!registered} value={fundAmount}
            onChange={(e)=>
          setFundAmount(e.target.value)}
          />{" "}
        </div>
        <div className="grid-100 campaign-inr">
          <p>INR: {(maticPrice * fundAmount).toFixed(2)} INR</p>
        </div>
        <div className="grid-100 campaign-funds">
          <button className="btn-theme" onClick={async ()=>
            await fund(campaignData.address, address, fundAmount)
            }>Fund campaign</button>
        </div>
      </div>
      <div className="grid-50"></div>
      {registered && (
      <div className="grid-50 campaign-funds">
        <button className="btn-theme"  onClick={async ()=>
          await withdraw(campaignData.address, address)
          }
          >
          Withdraw Funds
        </button>
      </div>
      )}


    </div>
  </div>
</section>
);
};

export default Campaign;