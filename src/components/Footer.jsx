import React from 'react'
import { FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <section className='footer' id='contact'>
        <div className='footer-grid'>
            <div className='grid-30 footer-logo'>
                <span><a href="/">crowdfundr</a></span>
            </div>
            <div className='grid-50 footer-body'>
                <div className='footer-body-links'><a href="#home">Home</a></div>
                <div className='footer-body-links'><a href="#mission">Mission</a></div>
                <div className='footer-body-links'><a href="#working">How it works</a></div>
                <div className='footer-body-links'><a href="/list">Listings</a></div>
                <div className='footer-body-links'><a href="#contact">Contact us</a></div>
            </div>
            <div className='grid-20 footer-social'>
                <a href="#"><span><FaTwitter /></span></a>
                <a href=""><span><FaLinkedin /></span></a>
            </div>
        </div>
    </section>
  )
}

export default Footer