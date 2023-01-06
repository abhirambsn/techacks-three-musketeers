import React from 'react'

const Step5 = () => {
  return (
    <div className='form-left'>
        <div className='form-group'>
            <label htmlFor="rewards">Offer to investor</label>
            <textarea name="rewards"></textarea>
        </div>
        <div>
            <button className='btn-theme multistep-btn'>Submit</button>
        </div>
    </div> 
  )
}

export default Step5