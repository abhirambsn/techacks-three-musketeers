import React from "react";
import { disableClick } from "../../utils/functions";
import { toast } from "react-hot-toast";
import { createNewCampaign } from "../../utils/interact";
import PPTUploadBtn from "../PPTUploadBtn";

const Step5 = ({
  name,
  desc,
  projectPeriod,
  totalAmt,
  imgUrl,
  stagePeriod,
  stageWiseAmt,
  investorOffering,
  setInvestorOffering,
  pptUrl,
  setPptUrl
}) => {
  return (
    <div className="form-left">
      <div className="form-group">
        <label htmlFor="rewards">Offer to investor</label>
        <textarea
          name="rewards"
          value={investorOffering}
          onChange={(e) => setInvestorOffering(e.target.value)}
        ></textarea>
      </div>
      <div>
        <PPTUploadBtn pptUrl={pptUrl} setPptUrl={setPptUrl} />
      </div>
      <div>
        <button
          className="btn-theme multistep-btn"
          onClick={async () => {
            if (imgUrl === "") {
              alert("Please upload a cover image");
              return;
            }
            if (pptUrl === "") {
              alert("Please upload a PPT / Pitch deck");
              return;
            }
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
              Object.values(stageWiseAmt),
              imgUrl,
              investorOffering,
              pptUrl
            );
            if (!result) {
              toast.error("Failure", { id: notification });
              document.body.style.pointerEvents = "auto";
              document.body.style.cursor = "auto";
              document.removeEventListener("click", disableClick);
            } else {
              setInvestorOffering("");
              toast.success("Success", { id: notification });
              setTimeout(() => (window.location.href = "/list"), 1000);
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
  );
};

export default Step5;
