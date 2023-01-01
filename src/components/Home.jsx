import React from 'react'
import Navbar from './Navbar'
import crowdfunding from '../img/crowdfunding.png'
import { FaSpaceShuttle, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Home = () => {
  return (
    <section className='section home' id='home'>
        <Navbar />
        <div className='home-section'>
            <div className='home-section-data'>
              <div className='home-grid'>
                <div className='grid-30'>
                  <div className='outer-decor'>
                    <div className='inner-decor-icon'><FaSpaceShuttle /></div>
                    <div className='inner-decor-text'><span>Make it happen</span></div>
                  </div>
                </div>
                <div className='grid-70'></div>
              </div>
              <div className='home-head'>
                <p>Let's make the impossible, possible</p>
              </div>
              <div className='home-subhead'>
                <p>Join us and be a part of something special. Together, we can make a difference and bring your dreams to reality.</p>
              </div>
              <div className='home-btn'>
                <a href="/list"><button className='btn-inverse'>Start Campaign</button></a>
              </div>
              <div className='home-socials'>
                <span className='home-socials-text'>Available on </span> <span className='home-socials-socials'><FaTwitter /></span> <span className='home-socials-socials'><FaLinkedin /></span>
              </div>
            </div>
            <div className='home-section-img'>
                <img src={crowdfunding} alt="crowd" />
            </div>
        </div>
    </section>
  )
}

export default Home