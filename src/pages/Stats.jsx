import React from 'react'
import { FaArrowLeft } from "react-icons/fa";

const Stats = () => {
  return (
    <section className='section stats' id='stats'>
        <div className='stats-grid padd-5'>
          <div className='stats-grid stats-box'>
            <div className='grid-20 stats-btn'>
              <button className='btn'>
              <FaArrowLeft className="campaign-btn" />
              </button>
            </div>
            <div className='grid-80 stats-head'>
              Campaign Stages
            </div>
            <div className='grid-100 stats-table'>
              <div className='grid-20 stats-table-head'>
                <div>S.No.</div>
                <div>Amount Needed</div>
                <div>Deadline</div>
                <div>Remarks</div>
                <div>Vote</div>
              </div>
              <div className='grid-20 stats-table-body'>
                <div>1</div>
                <div>100</div>
                <div>100 days</div>
                <div>Impressive</div>
                <div>
                  <button className='btn-inverse'>Yes</button>
                  <button className='btn-inverse'>No</button>
                </div>
              </div>
              <div className='grid-20 stats-table-body'>
                <div>2</div>
                <div>100</div>
                <div>100 days</div>
                <div>Impressive</div>
                <div>
                  <button className='btn-inverse'>Yes</button>
                  <button className='btn-inverse'>No</button>
                </div>
              </div>
              <div className='grid-20 stats-table-body'>
                <div>3</div>
                <div>100</div>
                <div>100 days</div>
                <div>Impressive</div>
                <div>
                  <button className='btn-inverse'>Yes</button>
                  <button className='btn-inverse'>No</button>
                </div>
              </div>
              <div className='grid-20 stats-table-body'>
                <div>4</div>
                <div>100</div>
                <div>100 days</div>
                <div>Impressive</div>
                <div>
                  <button className='btn-inverse'>Yes</button>
                  <button className='btn-inverse'>No</button>
                </div>
              </div>
              
            </div>
          </div>
        </div>
    </section>
  )
}

export default Stats