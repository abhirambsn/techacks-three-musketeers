import React, { useState } from "react";
import PictureUploadBtn from "../../components/PictureUploadBtn";

const Step3 = ({
  projectPeriod,
  setProjectPeriod,
  stagePeriod,
  setStagePeriod,
  totalAmt,
  setTotalAmt,
  imgUrl,
  setImgUrl,
}) => {
  return (
    <div className="form-left">
      <div className="form-group">
        <label htmlFor="period">Project period: </label>
        <input
          value={projectPeriod}
          onChange={(e) => setProjectPeriod(e.target.value)}
          type="number"
          name="period"
        />
      </div>

      <div className="form-group">
        <label htmlFor="stage">Period per stage: </label>
        <input
          type="number"
          value={stagePeriod}
          onChange={e => setStagePeriod(e.target.value)}
          name="stage"
        />
      </div>
      <div className="form-group">
        <label htmlFor="target">Amount required: </label>
        <input
          value={totalAmt}
          onChange={(e) => setTotalAmt(e.target.value)}
          type="number"
          name="target"
        />
      </div>

      <div className="form-group">
        <PictureUploadBtn
          disabled={imgUrl.length > 0}
          setImgUrl={setImgUrl}
          imgUrl={imgUrl}
        />
      </div>

      <div className="form-group">
        <button
          onClick={() => setImgUrl("")}
          className={imgUrl.length <= 0 ? "btn-disabled" : "btn-inverse"}
          disabled={imgUrl.length <= 0}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Step3;
