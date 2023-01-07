import React from 'react'

const Step2 = ({desc, setDesc}) => {
  return (
    <div className='form-left'>
        <div className="form-group">
            <label htmlFor="description">Campaign Description</label>
            <textarea name="description" value={desc} onChange={e => setDesc(e.target.value)} required></textarea>
        </div>
        <div className="form-group" style={{color: '#C8C6C6'}}>
          Guidelines to write a description:
          <ul>
            <li>Keep it concise</li>
            <li>Write what are you going to develop in this project</li>
            <li>The more impressive your description the more likely<br /> it is to get backers for your project</li>
          </ul>
        </div>
    </div>
  )
}

export default Step2