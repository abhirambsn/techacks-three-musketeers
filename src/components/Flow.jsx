import React from 'react'
import flowchart from '../img/flowchart.png'

const Flow = () => {
  return (
    <section className='section flow' id='flow'>
        <div className='flow-grid'>
            <div className='grid-100 flow-head'>
                <p>How it works!</p>
            </div>
            <div className='grid-100 flow-chart'>
                <img src={flowchart} alt="flowchart" />
            </div>
        </div>
    </section>
  )
}

export default Flow