import React, { useState } from "react";
import { createNewCampaign } from "../../utils/interact";

const TestingNewCampaign = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [stagePeriod, setStagePeriod] = useState(0);
  const [projectPeriod, setProjectPeriod] = useState(0);
  const [totalAmt, setTotalAmt] = useState(0);
  const [stageWiseAmt, setStageWiseAmt] = useState({});

  const calcNstages = () => {
    if (stagePeriod == 0 || projectPeriod == 0) {
      return 0;
    }
    return Math.round(projectPeriod / stagePeriod);
  };
  return (
    <div>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="desc">Description</label>
        <textarea
          name="desc"
          id="desc"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="sp">Stage Period (in days)</label>
        <input
          type="number"
          name="sp"
          id="sp"
          value={stagePeriod}
          onChange={(e) => setStagePeriod(parseInt(e.target.value))}
        />
      </div>
      <div>
        <label htmlFor="tp">Project period (in Days)</label>
        <input
          type="number"
          name="tp"
          id="tp"
          value={projectPeriod}
          onChange={(e) => setProjectPeriod(parseInt(e.target.value))}
        />
      </div>
      <p>No of stages: {calcNstages()}</p>
      <div>
        <label htmlFor="totalAmt">Total Amount Needed (in MATIC)</label>
        <input
          type="number"
          name="totalAmt"
          id="totalAmt"
          value={totalAmt}
          onChange={(e) => setTotalAmt(e.target.value)}
        />
      </div>
      {/* Stages */}
      {(stagePeriod !== "" ||
        projectPeriod !== "" ||
        projectPeriod !== 0 ||
        stagePeriod !== 0) && (
        <>
          {Array(calcNstages())
            .fill(0)
            .map((_, idx) => (
              <div key={idx}>
                <label htmlFor={`stage-${idx + 1}`}>Stage {idx + 1}</label>
                <input
                  type="number"
                  name={`stage-${idx + 1}`}
                  id={`stage-${idx + 1}`}
                  value={stageWiseAmt[idx]}
                  onChange={(e) =>
                    setStageWiseAmt({ ...stageWiseAmt, [idx]: e.target.value })
                  }
                />
              </div>
            ))}
        </>
      )}
      <button
        onClick={async () => {
          const result = await createNewCampaign(
            name,
            desc,
            stagePeriod,
            projectPeriod,
            totalAmt,
            Object.values(stageWiseAmt)
          );
          if (!result) {
            alert("Failure");
            return result;
          }
          alert("Success");
          return result;
        }}
      >
        Create New Campaign
      </button>
    </div>
  );
};

export default TestingNewCampaign;
