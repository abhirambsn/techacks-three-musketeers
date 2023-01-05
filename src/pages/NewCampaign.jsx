import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa";
import { createNewCampaign } from "../utils/interact";
const NewCampaign = () => {
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
    <section className="section form" id="form">
      <div className="form-grid">
        <div className="grid-100 form-back-btn">
          <a href="/list">
            <button className="btn-theme">
              <FaArrowLeft className="listing-btn" />
            </button>
          </a>
        </div>
        <div className="grid-100 form-head">
          <p>Start a campaign!</p>
        </div>
        <div className="grid-100 form-container">
          <div className="form-form">
            <div className="grid-50 form-left">
              <div className="form-group">
                <label htmlFor="campaign-title">Campaign Title: </label>
                <input
                  type="text"
                  name="campaign-title"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="What would you like to name your campaign?"
                />
              </div>
              <div className="form-group">
                <label htmlFor="campaign-desc">Campaign Description: </label>
                <textarea
                  name="campaign-desc"
                  className="form-control"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="A crisp description to attract investors to your project"
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="campaign-title">Campaign Target: </label>
                <input
                  type="number"
                  name="campaign-title"
                  className="form-control"
                  placeholder="How much amount you need to raise? (in MATIC)"
                  value={totalAmt}
                  onChange={(e) => setTotalAmt(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="campaign-title">
                  Project Period (in Days):{" "}
                </label>
                <input
                  type="number"
                  name="campaign-title"
                  className="form-control"
                  value={projectPeriod}
                  onChange={(e) => setProjectPeriod(parseInt(e.target.value))}
                  placeholder="How much time is required to finish the project?"
                />
              </div>
              <div className="form-group">
                <label htmlFor="campaign-title">Stage Period (in Days): </label>
                <input
                  type="number"
                  name="campaign-title"
                  className="form-control"
                  value={stagePeriod}
                  onChange={(e) => setStagePeriod(parseInt(e.target.value))}
                  placeholder="How much time is required to finish a single stage?"
                />
              </div>
              <div className="form-group padd-5">
                <button
                  className="btn-theme"
                  onClick={async () => {
                    document.addEventListener("click", (e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      document.body.style.pointerEvents = "none";
                      document.body.style.cursor = "progress";
                    });
                    const notification = toast.loading(
                      "Campaign creation in progress..."
                    );
                    const result = await createNewCampaign(
                      name,
                      desc,
                      stagePeriod,
                      projectPeriod,
                      totalAmt,
                      Object.values(stageWiseAmt)
                    );
                    if (!result) {
                      toast.error("Failure", { id: notification });
                    } else {
                      setName("");
                      setDesc("");
                      setProjectPeriod(0);
                      setTotalAmt(0);
                      setStagePeriod(0);
                      setStageWiseAmt({});
                      toast.success("Success", { id: notification });
                      setTimeout(() => (window.location.href = "/list"), 1000);
                    }
                    document.body.style.pointerEvents = "auto";
                    document.removeEventListener("click", (e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      document.body.style.pointerEvents = "none";
                      document.body.style.cursor = "progress";
                    });
                  }}
                >
                  Create Campaign
                </button>
              </div>
            </div>
            <div className="grid-50 form-right">
              {(stagePeriod !== "" ||
                projectPeriod !== "" ||
                projectPeriod !== 0 ||
                stagePeriod !== 0) && (
                <>
                  {Array(calcNstages())
                    .fill(0)
                    .map((_, idx) => (
                      <div className="form-group" key={idx}>
                        <label htmlFor={`stage-${idx + 1}`}>
                          Stage {idx + 1}
                        </label>
                        <input
                          type="number"
                          name={`stage-${idx + 1}`}
                          className="form-control"
                          value={stageWiseAmt[idx]}
                          onChange={(e) =>
                            setStageWiseAmt({
                              ...stageWiseAmt,
                              [idx]: e.target.value,
                            })
                          }
                          placeholder="Amount to be used in stage 1?"
                        />
                        <textarea
                          name={`stage-${idx + 1}`}
                          className="form-control"
                          placeholder={`"Stage - ${
                            idx + 1
                          } targets and how you plan on acheiving them?"`}
                        ></textarea>
                      </div>
                    ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewCampaign;
