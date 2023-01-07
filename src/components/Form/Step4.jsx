import React from "react";

const Step4 = ({
  stagePeriod,
  projectPeriod,
  totalAmt,
  stageWiseAmt,
  setStageWiseAmt,
}) => {
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
    <div className="form-right">
      {Array(calcNstages())
        .fill(0)
        .map((_, i) => (
          <div key={i} className="form-group">
            <label htmlFor={`stage-${i + 1}`}>
              Fund needed for Stage {i + 1}
            </label>
            <input
              type="number"
              value={stageWiseAmt[i]}
              onChange={(e) =>
                setStageWiseAmt({
                  ...stageWiseAmt,
                  [i]: e.target.value,
                })
              }
              name={`stage-${i + 1}`}
            />
          </div>
        ))}
    </div>
  );
};

export default Step4;
