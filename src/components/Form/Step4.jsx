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
      <div key={1} className="form-group">
        <label htmlFor={`stage-1`}>Fund needed for Stage 1</label>
        <input
          type="number"
          value={
            stageWiseAmt[0] > parseFloat(totalAmt) * 0.2
              ? (parseFloat(totalAmt) * 0.2).toString()
              : stageWiseAmt[0]
          }
          onChange={(e) =>
            setStageWiseAmt({
              ...stageWiseAmt,
              0:
                stageWiseAmt[0] > parseFloat(totalAmt) * 0.2
                  ? (parseFloat(totalAmt) * 0.2).toString()
                  : e.target.value,
            })
          }
          name={`stage-1`}
        />
      </div>
      {Array(calcNstages() - 1)
        .fill(0)
        .map((_, i) => (
          <div key={i + 1} className="form-group">
            <label htmlFor={`stage-${i + 2}`}>
              Fund needed for Stage {i + 2}
            </label>
            <input
              type="number"
              value={stageWiseAmt[i + 1]}
              onChange={(e) =>
                setStageWiseAmt({
                  ...stageWiseAmt,
                  [i + 1]: e.target.value,
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
