import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { disableClick } from "../utils/functions";
import { createNewCampaign } from "../utils/interact";
import PictureUploadBtn from "../components/PictureUploadBtn";

const NewCampaign = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [stagePeriod, setStagePeriod] = useState(0);
  const [projectPeriod, setProjectPeriod] = useState(0);
  const [totalAmt, setTotalAmt] = useState(0);
  const [stageWiseAmt, setStageWiseAmt] = useState({});
  const [imgUrl, setImgUrl] = useState("");

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
    <section className="section form-page" id="form-page">
      <div className="form-grid">
        <div className="grid-20">
          <a href="/">
            <button className="btn-inverse">
              <FaArrowLeft className="listing-btn" />
            </button>
          </a>
        </div>
        <div className="grid-60 form-head">
          <p>Start a campaign</p>
        </div>
        <div className="grid-20"></div>
        <div className="grid-100 form-decoration">
          <div className="form-circle-0"></div>
          <div className="form-circle-1"></div>
          <div className="form-circle-2"></div>
          <div className="form-circle-3"></div>
        </div>
        <div className="grid-100 form-div">
          <div className="form-form">
            <div className="form-left">
              <div className="form-group">
                <label htmlFor="title">Campaign title: </label>
                <input
                  type="text"
                  value={name}
                  name="title"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Campaign description: </label>
                <textarea
                  name="description"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="period">Project period: </label>
                <input
                  type="text"
                  name="period"
                  value={projectPeriod}
                  onChange={(e) => setProjectPeriod(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="stage">Period per stage: </label>
                <input
                  type="text"
                  name="stage"
                  value={stagePeriod}
                  onChange={(e) => setStagePeriod(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="target">Amount required: </label>
                <input
                  type="text"
                  name="target"
                  value={totalAmt}
                  onChange={(e) => setTotalAmt(e.target.value)}
                />
              </div>
              <div className="form-group">
                <PictureUploadBtn
                  disabled={imgUrl.length > 0}
                  setImgUrl={setImgUrl}
                />
                <button
                  onClick={() => setImgUrl("")}
                  className={
                    imgUrl.length <= 0 ? "btn-disabled" : "btn-inverse"
                  }
                  disabled={imgUrl.length <= 0}
                >
                  Reset
                </button>
                <button
                  className={imgUrl.length <= 0 ? "btn-disabled" : "btn-theme"}
                  disabled={imgUrl.length <= 0}
                  onClick={() => setPart2(true)}
                >
                  Proceed
                </button>
              </div>
            </div>
            {part2 && (
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

                <div className="form-group">
                  <button
                    className="btn-theme"
                    onClick={async () => {
                      document.addEventListener("click", disableClick);
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
                        setTimeout(
                          () => (window.location.href = "/list"),
                          1000
                        );
                      }
                      document.body.style.pointerEvents = "auto";
                      document.body.style.cursor = "auto";
                      document.removeEventListener("click", disableClick);
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewCampaign;
