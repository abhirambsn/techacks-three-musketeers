import React, { useState } from 'react'
import { FaWallet } from "react-icons/fa";

const Widget = () => {

    const [toggle, setToggle] = useState(false);
    

  return (
    <div className={`widget ${toggle ? 'widget-on' : 'widget-off'}`} onClick={() => setToggle(!toggle)}>
        <div className='widget-grid'>
            <div className='widget-img'><FaWallet /></div>
            <div className='widget-balance'><p>Balance: 1.00 Matic</p></div>
        </div>
    </div>
  )
}

export default Widget