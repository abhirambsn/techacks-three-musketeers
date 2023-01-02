import React from 'react'

window.addEventListener('load', ()=>{
    document.querySelectorAll('.campaignCardProgress').forEach(element => {
        var w = element.dataset.progress;
        element.style.width = `${w}%`;
    })
});

const CampaignCard = ({image, title, description, raised, target, deadline, linkTo}) => {
  return (
    <div className='campaignCard'>
        <div className='campaignCardImg'>
            <img src={image} alt="#" />
        </div>
        <div className='campaignCardData'>
            <div className='campaignCardHead grid-100'>
                <p>{title}</p>
            </div>
            <div className='campaignCardDesc grid-100'>
                <p>{description}</p>
            </div>
            <div className='campaignCardStats'>
                <div className='campaignCardCurrent grid-50'>
                    <p>Raised : {raised}</p>
                </div>
                <div className='campaignCardTarget grid-50'>
                    <p>Target : {target}</p>
                </div>
                <div className='campaignCardProgressBar grid-100'>
                    <div className='campaignCardProgress' data-progress={(raised/target)*100}></div>
                </div>
                <div className='campaignCardPercent grid-70'>
                    <p>{raised*100/target}% target reached</p>
                </div>
                <div className='campaignCardTimeLeft grid-30'>
                    <p>{deadline}</p>
                </div>
                <div className='campaignCardBtn grid-100'>
                    <a href={linkTo}><button className='btn-theme'>View More</button></a>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CampaignCard