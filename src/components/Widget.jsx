import React, { useEffect, useState } from 'react'
import { FaWallet } from "react-icons/fa";
import useAccount from '../hooks/useAccount';
import useProvider from '../hooks/useProvider';
import { getBalance } from '../utils/interact';

const Widget = () => {

    const [toggle, setToggle] = useState(false);
    const [balance, setBalance] = useState("0");
    const provider = useProvider();
    const address = useAccount(provider);

    useEffect(() => {
      ;(async () => {
        if (!address) return;
        setBalance(await getBalance(address));
      })();
    }, [address]);
    

  return (
    <div className={`widget ${toggle ? 'widget-off' : 'widget-on'}`} onClick={() => setToggle(!toggle)}>
        <div className='widget-grid'>
            <div className='widget-img' ><FaWallet /></div>
            <div className='widget-balance'><p>Balance: {balance} MATIC</p></div>
        </div>
    </div>
  )
}

export default Widget