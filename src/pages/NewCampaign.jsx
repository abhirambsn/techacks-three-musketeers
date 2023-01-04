import React, {useState} from 'react'
import { FaArrowLeft } from "react-icons/fa";
const NewCampaign = () => {

    const [page, setPage] = useState(0);

  return (
    <section className='section form' id='form'>
        <div className='form-grid'>
            <div className='grid-100 form-back-btn'>
                <a href="/list">
                <button className='btn-theme'>
                <FaArrowLeft className="listing-btn" />
                </button>
                </a>
            </div>
            <div className='grid-100 form-head'>
                <p>Start a campaign!</p>
            </div>
            <div className='grid-100 form-container'>
                <form action="#" className='form-form'>
                    <div className='grid-50 form-left'>
                        <div className='form-group'>
                            <label htmlFor="campaign-title">Campaign Title: </label>
                            <input type="text" name='campaign-title' className='form-control' placeholder='What would you like to name your campaign?' />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="campaign-desc">Campaign Description: </label>
                            <textarea name="campaign-desc" className='form-control' placeholder='A crisp description to attract investors to your project'></textarea>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="campaign-title">Campaign Target: </label>
                            <input type="number" name='campaign-title' className='form-control' placeholder='How much amount you need to raise?' />
                        </div>
                        <div className='form-group padd-5'>
                            <button className='btn-theme'>Create Campaign</button>
                        </div>
                    </div>
                    <div className='grid-50 form-right'>
                        <div className='form-group'>
                            <label htmlFor="stage-1">Stage 1 </label>
                            <input type="number" name="stage-1" className='form-control' placeholder='Amount to be used in stage 1?' />
                            <textarea name="stage-1" className='form-control' placeholder='Stage - 1 targets and how you plan on acheiving them?'></textarea>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="stage-2">Stage 2 </label>
                            <input type="number" name="stage-2" className='form-control' placeholder='Amount to be used in stage 2?' />
                            <textarea name="stage-2" className='form-control' placeholder='Stage - 2 targets and how you plan on acheiving them?'></textarea>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="stage-3">Stage 3 </label>
                            <input type="number" name="stage-3" className='form-control' placeholder='Amount to be used in stage 3?' />
                            <textarea name="stage-3" className='form-control' placeholder='Stage - 3 targets and how you plan on acheiving them?'></textarea>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="stage-4">Stage 4 </label>
                            <input type="number" name="stage-4" className='form-control' placeholder='Amount to be used in stage 4?' />
                            <textarea name="stage-4" className='form-control' placeholder='Stage - 4 targets and how you plan on acheiving them?'></textarea>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </section>
  )
}

export default NewCampaign  