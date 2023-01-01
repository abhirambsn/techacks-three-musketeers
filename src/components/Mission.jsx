import React from 'react'
import { FaCrown } from 'react-icons/fa';

const Mission = () => {
  return (
    <section className='section mission' id='mission' >
        <div className='mission-grid'>
            <div className='grid-40 padd-5'>
                <div className='mission-head-icon'>
                    <span>-- <FaCrown /> ---</span>
                </div>
                <div className='mission-head'>
                    <p>Large pool potential investors</p>
                </div>
                <div className='mission-subhead'>
                    <p>With our crowdfunding platform, you can support the projects and causes you care about most.</p>
                </div>
            </div>
            <div className='grid-60'>
                <div className='mission-item-grid'>
                    <div className='mission-item'>
                        <div className='mission-decor'>
                        <div className='mission-item-decor'></div> 
                        <div className='mission-item-head'>$5B+</div>
                        </div>
                        <div className='mission-item-subhead'>We have raised an impressive amount of funds. Help us continue to grow and reach our ultimate goal.</div>
                    </div>
                    <div className='mission-item'>
                        <div className='mission-decor'>
                        <div className='mission-item-decor'></div> 
                        <div className='mission-item-head'>15K+</div>
                        </div>
                        <div className='mission-item-subhead'>Over 12k campaigns are funded. Join us and be a part of our success story.</div>
                    </div>
                    <div className='mission-item'>
                        <div className='mission-decor'>
                        <div className='mission-item-decor'></div> 
                        <div className='mission-item-head'>700+</div>
                        </div>
                        <div className='mission-item-subhead'>We have more than 700 campaigns. Help us continue to build this vision into reality.</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Mission  