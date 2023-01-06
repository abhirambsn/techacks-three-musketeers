import React, { useState } from "react";
import PictureUploadBtn from "../PictureUploadBtn";

const Step1 = () => {

    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [stagePeriod, setStagePeriod] = useState(0);
    const [projectPeriod, setProjectPeriod] = useState(0);
    const [totalAmt, setTotalAmt] = useState(0);
    const [stageWiseAmt, setStageWiseAmt] = useState({});

  
    const [part2, setPart2] = useState(false);
  
    const calcNstages = () => {
      if (
        stagePeriod.length === 0 ||
        parseInt(stagePeriod) == 0 ||
        parseInt(projectPeriod) == 0
      ) {
        return 0;
      }
      return Math.round(parseInt(projectPeriod) / parseInt(stagePeriod));
    };

  return (
    <div className='form-left'>
        <div className='form-group'>
            <label htmlFor="title">Campaign Title</label>
            <input type="text" name="title" required />
        </div>
    </div>
  )
}

export default Step1