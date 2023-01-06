import React, { useLayoutEffect, useState } from 'react'
import { FaWallet } from "react-icons/fa";
import { useLocation } from 'react-router-dom';
import useAccount from '../hooks/useAccount';
import useProvider from '../hooks/useProvider';
import { getBalance } from '../utils/interact';

const Widget = () => {

    const [toggle, setToggle] = useState(false);
    const [balance, setBalance] = useState("0");
    const provider = useProvider();
    const address = useAccount(provider);
    const location = useLocation();

    useLayoutEffect(() => {
      ;(async () => {
        setBalance(await getBalance(address));
      })();
    }, [location, address]);
    

  return (
    <div className={`widget ${toggle ? 'widget-on' : 'widget-off'}`} onClick={() => setToggle(!toggle)}>
        <div className='widget-grid'>
            <div className='widget-img'><FaWallet /></div>
            <div className='widget-balance'><p>Balance: {balance} MATIC</p></div>
        </div>
    </div>
  )
}

export default Widget