import React, { useLayoutEffect } from "react";
import CampaignCard from "../components/CampaignCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useLoaderData, useLocation } from "react-router-dom";
import { truncateDescription } from "../utils/functions";

const Listing = () => {
  const campaignData = useLoaderData();

  return (
    <section className="section listing" id="listing">
      <div className="listing-grid">
        <div className="grid-20">
          <a href="/">
            <button className="btn-theme">
              {" "}
              <FaArrowLeft className="listing-btn" />
              Home
            </button>
          </a>
        </div>
        <div className="grid-60 listing-head">
          <p>Ongoing Campaigns</p>
        </div>
        <div className="grid-20">
          <a href="/newCampaign">
            <button className="btn-theme">
              {" "}
              Start a campaign
              <FaArrowRight className="listing-btn" />
            </button>
          </a>
        </div>
        {campaignData.map((cD, i) => (
          <div className="grid-30">
            <CampaignCard
              title={cD.name}
              image="https://picsum.photos/300/200"
              description={truncateDescription(cD.desc)}
              raised={cD.currentProgress}
              target={cD.totalAmountNeeded}
              deadline={cD.projectDeadline}
              linkTo={`/campaign/${cD.address}`}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Listing;
