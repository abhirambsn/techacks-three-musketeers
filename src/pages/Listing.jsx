import React, { useLayoutEffect } from "react";
import CampaignCard from "../components/CampaignCard";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import { useLoaderData, useLocation, useNavigation } from "react-router-dom";
import { truncateDescription } from "../utils/functions";
import LoaderComponent from "../components/LoaderComponent";
import Widget from '../components/Widget'
const Listing = () => {
  const campaignData = useLoaderData();
  const navigation = useNavigation();

  console.log(campaignData);

  return navigation.state === "loading" ? (
    <LoaderComponent />
  ) : (
    <section className="section listing" id="listing">
      <div className="listing-grid">
        <div className="grid-20">
          <a href="/">
            <button className="btn-inverse">
              <FaArrowLeft className="listing-btn" />
            </button>
          </a>
        </div>
        <div className="grid-60 listing-head">
          <p>Ongoing Campaigns</p>
        </div>
        <div className="grid-20">
          <a href="/new">
            <button className="btn-inverse">
              Start a campaign{"  "}
              <FaPlus className="listing-btn" />
            </button>
          </a>
        </div>
        {campaignData.map((cD, i) => (
          <div className="grid-30" key={i}>
            <CampaignCard
              title={cD.name}
              image={cD.coverImg}
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
