import React from 'react'
import { FaArrowLeft} from 'react-icons/fa';

window.addEventListener('load', ()=>{
  var element = document.querySelector('.campaign-progress');
  var w = element.dataset.progress;
  element.style.width = `${w}%`;
});

const Campaign = () => {
  return (
    <section className='section campaign' id='campaign'>
        <div className='campaign-grid'>
          <div className="grid-40">
            <a href="/"><button className="btn-inverse"> <FaArrowLeft className="campaign-btn" /> Home</button></a>
          </div>
          <div className="grid-60 campaign-head">
            <p>Campaign AI Smart Robo Project</p>
          </div>
          <div className='grid-50 campaign-img'>
            <div className='campaign-img-upper'></div>
            <img src="https://picsum.photos/400/300" alt="" />
            <div className='campaign-img-lower'></div>
          </div>
          <div className='grid-50'>
            <div className='campaign-desc'>
              <div className='campaign-desc-head'>
                  <span>Description - </span>
              </div>
              <div className='campaign-desc-text'>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit praesentium excepturi asperiores? Dolorum voluptas in ab sapiente incidunt eos porro exercitationem. Aperiam aut eos et ad odit accusantium consequuntur, quisquam, natus, eum cum iure. Blanditiis quod fugit vero minus laboriosam fugiat laborum velit! Beatae enim perspiciatis voluptatem, non alias illo.
                <br /><br />
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium eligendi doloribus quasi labore. Harum asperiores excepturi expedita molestiae natus accusantium earum tenetur ratione nulla, mollitia, repellendus amet voluptate. A adipisci reprehenderit, ut commodi magnam quia. Minus, vero iusto. Iste amet nesciunt esse aperiam repellat eveniet cupiditate quod quaerat maiores exercitationem! 
                </p>
              </div>
              <div className='campaign-desc-stats'>
                <div className='grid-100'>
                  <button className='btn-theme'>Invest here!</button>
                </div>
                <div className='grid-100 campaign-progress-bar-holder'>
                  <div className='campaign-progress-bar'></div>
                  <div className='campaign-progress' data-progress="100"></div>
                </div>
                <div className='grid-100 campaign-progress-percent'>
                  Progress: 100%  
                </div>  
                <div className='grid-100'>
                  Time Remainig: 30 days
                </div>
                <div className='grid-50'>
                  Target: $13M
                </div>
                <div className='grid-50'>
                  Collected: $71,5M
                </div>
              </div>
            </div>
          
          </div>
        </div>
    </section>
  )
}

export default Campaign