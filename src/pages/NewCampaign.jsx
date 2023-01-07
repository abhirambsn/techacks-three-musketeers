import React, { useState } from "react";
import Multistep from "react-multistep";
import Step1 from "../components/Form/Step1";
import Step2 from "../components/Form/Step2";
import Step3 from "../components/Form/Step3";
import Step4 from "../components/Form/Step4";
import Step5 from "../components/Form/Step5";
import { FaArrowLeft } from "react-icons/fa";

const Form = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [stagePeriod, setStagePeriod] = useState(0);
  const [projectPeriod, setProjectPeriod] = useState(0);
  const [totalAmt, setTotalAmt] = useState(0);
  const [stageWiseAmt, setStageWiseAmt] = useState({});
  const [investorOffering, setInvestorOffering] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [pptUrl, setPptUrl] = useState("");

  const steps = [
    { title: "Name", component: <Step1 name={name} setName={setName} /> },
    {
      title: "Description",
      component: <Step2 desc={desc} setDesc={setDesc} />,
    },
    {
      title: "Deadlines and Timings",
      component: (
        <Step3
          stagePeriod={stagePeriod}
          setStagePeriod={setStagePeriod}
          projectPeriod={projectPeriod}
          setProjectPeriod={setProjectPeriod}
          totalAmt={totalAmt}
          setTotalAmt={setTotalAmt}
          imgUrl={imgUrl}
          setImgUrl={setImgUrl}
        />
      ),
    },
    {
      title: "Finance",
      component: (
        <Step4
          stagePeriod={stagePeriod}
          projectPeriod={projectPeriod}
          totalAmt={totalAmt}
          stageWiseAmt={stageWiseAmt}
          setStageWiseAmt={setStageWiseAmt}
        />
      ),
    },
    {
      title: "Misc",
      component: (
        <Step5
          name={name}
          desc={desc}
          projectPeriod={projectPeriod}
          totalAmt={totalAmt}
          imgUrl={imgUrl}
          stagePeriod={stagePeriod}
          stageWiseAmt={stageWiseAmt}
          pptUrl={pptUrl}
          setPptUrl={setPptUrl}
          investorOffering={investorOffering}
          setInvestorOffering={setInvestorOffering}
        />
      ),
    },
  ];

  return (
    <section className="section form">
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
        <div className="form-div grid-100">
          <div className="form-form">
            <Multistep
              activeStep={0}
              showNavigation={true}
              steps={steps}
              nextStyle={{
                padding: "10px 15px",
                borderRadius: "5px",
                background: "var(--text-color-100)",
                color: "var(--bg-color-500)",
                fontSsize: "15px",
                fontWeight: "600",
                border: "1px solid var(--bg-color-500)",
                transition: "all 0.3s ease",
                fontFamily: '"Roboto Slab",serif',
                cursor: "pointer",
                margin: "0 90%",
              }}
              prevStyle={{
                padding: "10px 15px",
                borderRadius: "5px",
                background: "var(--text-color-100)",
                color: "var(--bg-color-500)",
                fontSsize: "15px",
                fontWeight: "600",
                border: "1px solid var(--bg-color-500)",
                transition: "all 0.3s ease",
                fontFamily: '"Roboto Slab",serif',
                cursor: "pointer",
                position: "absolute",
              }}
              stepCustomStyle={{
                color: "var(--bg-color-500)",
                fontWeight: "600",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Form;
