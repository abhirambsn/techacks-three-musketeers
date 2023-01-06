import React from 'react'

const Step2 = () => {
  return (
    <div className='form-left'>
        <div className="form-group">
            <label htmlFor="description">Campaign Description</label>
            <textarea name="description" required></textarea>
        </div>
    </div>
  )
}

export default Step2