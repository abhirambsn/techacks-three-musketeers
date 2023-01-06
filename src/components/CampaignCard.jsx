import React, { useLayoutEffect } from "react";

const CampaignCard = ({
  image,
  title,
  description,
  raised,
  target,
  deadline,
  linkTo,
}) => {
  useLayoutEffect(() => {
    document.querySelectorAll(".campaignCardProgress").forEach((element) => {
      var w = element.dataset.progress;
      if (w >= 100) {
        w = 100;
      }
      element.style.width = `${w}%`;
    });
  }, []);
  return (
    <div className="campaignCard">
      <div className="campaignCardImg">
        <img height={200} width={300} style={{objectFit: 'cover'}} src={image} alt="#" />
      </div>
      <div className="campaignCardData">
        <div className="campaignCardHead grid-100">
          <p>{title}</p>
        </div>
        <div className="campaignCardDesc grid-100">
          <p>{description}</p>
        </div>
        <div className="campaignCardStats">
          <div className="campaignCardCurrent grid-50">
            <p>Raised : {raised} MATIC</p>
          </div>
          <div className="campaignCardTarget grid-50">
            <p>Target : {target} MATIC</p>
          </div>
          <div className="campaignCardProgressBar grid-100">
            <div
              className="campaignCardProgress"
              data-progress={(raised / target) * 100}
            ></div>
          </div>
          <div className="campaignCardPercent grid-70">
            <p>{((raised * 100) / target).toFixed(2)}% target reached</p>
          </div>
          <div className="campaignCardTimeLeft grid-30">
            <p>{deadline}</p>
          </div>
          <div className="campaignCardBtn grid-100">
            <a href={linkTo}>
              <button className="btn-theme">View More</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;
