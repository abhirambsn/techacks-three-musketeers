import React from 'react'
import { FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <section className='footer' id='contact'>
        <div className='footer-grid'>
            <div className='grid-40 footer-logo'>
                <span><a href="/">crowdfundr</a></span>
            </div>
            <div className='grid-40 footer-body'>
                <div className='footer-body-links'><a href="#home">Home</a></div>
                <div className='footer-body-links'><a href="#mission">Mission</a></div>
                <div className='footer-body-links'><a href="#working">How it works</a></div>
                <div className='footer-body-links'><a href="#contact">Contact us</a></div>
            </div>
            <div className='grid-20 footer-social'>
                <span><FaTwitter /></span>
                <span><FaLinkedin /></span>
            </div>
        </div>
    </section>
  )
}

export default Footer