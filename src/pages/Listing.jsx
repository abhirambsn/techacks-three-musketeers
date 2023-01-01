import React from "react";
import CampaignCard from "../components/CampaignCard";
import { FaArrowLeft} from 'react-icons/fa';

const Listing = () => {
  return (
    <section className="section listing" id='listing'>
      <div className="listing-grid">
        <div className="grid-40">
          <a href="/"><button className="btn-theme"> <FaArrowLeft className="listing-btn" /> Home</button></a>
        </div>
        <div className="grid-60 listing-head">
          <p>Ongoing Campaigns</p>
        </div>
        <div className="grid-30">
        <CampaignCard title="AI Smart Robot Project" image="https://picsum.photos/300/200" description="10 word description" raised="$71,5M" target="$13M" reached="550" days="30" progress="100" linkTo="/" />
        </div>
        <div className="grid-30">
        <CampaignCard title="Modular House Building" image="https://picsum.photos/300/200" description="10 word description" raised="$1M" target="$10M" reached="10" days="110" progress="10" linkTo="/" />
        </div>
      </div>
    </section>
  )
};

export default Listing;
