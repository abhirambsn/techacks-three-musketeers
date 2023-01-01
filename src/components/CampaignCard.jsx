import React from 'react'

window.addEventListener('load', ()=>{
    document.querySelectorAll('.campaignCardProgress').forEach(element => {
        var w = element.dataset.progress;
        element.style.width = `${w}%`;
    })
});

const CampaignCard = (props) => {
  return (
    <div className='campaignCard'>
        <div className='campaignCardImg'>
            <img src={props.image} alt="#" />
        </div>
        <div className='campaignCardData'>
            <div className='campaignCardHead grid-100'>
                <p>{props.title}</p>
            </div>
            <div className='campaignCardDesc grid-100'>
                <p>{props.description}</p>
            </div>
            <div className='campaignCardStats'>
                <div className='campaignCardCurrent grid-50'>
                    <p>Raised : {props.raised}</p>
                </div>
                <div className='campaignCardTarget grid-50'>
                    <p>Target : {props.target}</p>
                </div>
                <div className='campaignCardProgressBar grid-100'>
                    <div className='campaignCardProgress' data-progress={props.progress}></div>
                </div>
                <div className='campaignCardPercent grid-70'>
                    <p>{props.reached}% target reached</p>
                </div>
                <div className='campaignCardTimeLeft grid-30'>
                    <p>{props.days} days left</p>
                </div>
                <div className='campaignCardBtn grid-100'>
                    <a href={props.linkTo}><button className='btn-theme'>View More</button></a>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CampaignCard