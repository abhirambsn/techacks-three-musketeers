import React from 'react'
import display from '../img/display.jpg'

const Working = () => {
  return (
    <section className='section working' id='working' >
        <div className='working-grid'>
            <div className='grid-40'>
                <div className='working-decor'>
                    <div className='working-decor-square-1'></div>
                    <div className='working-decor-square-2'></div>
                    <div className='working-decor-square-3'><img src={display} alt="display" /></div>
                </div>
            </div>
            <div className='grid-60 working-data'>
                <div className='working-head'>
                    <p>Transform your ideas into action with our crowdfunding platform</p>
                </div>
                <div className='working-subhead'>
                    <p>Join a community of like-minded individuals and supporters who believe in the power of community and in the potential of great ideas.</p>
                </div>
                <div className='working-btn'>
                    <button className='btn-theme'>Learn More</button>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Working