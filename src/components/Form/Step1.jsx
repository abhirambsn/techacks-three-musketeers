import React, { useState } from "react";

const Step1 = ({name, setName}) => {
    

  return (
    <div className='form-left'>
        <div className='form-group'>
            <label htmlFor="title">Campaign Title</label>
            <input type="text" name="title" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <p className="form-group" style={{color: '#C8C6C6'}}>*Write a catcy name which can attract backers</p>
    </div>
  )
}

export default Step1