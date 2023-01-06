import React from "react";
import Multistep from "react-multistep";
import Step1 from "../components/Form/Step1";
import Step2 from "../components/Form/Step2";
import Step3 from "../components/Form/Step3";
import Step4 from "../components/Form/Step4";
import Step5 from "../components/Form/Step5";
import { FaArrowLeft } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { disableClick } from "../utils/functions";
import { createNewCampaign } from "../utils/interact";



const Form = () => {
  const steps = [
    { title: "1", component: <Step1 /> },
    { title: "2", component: <Step2 /> },
    { title: "3", component: <Step3 /> },
    { title: "4", component: <Step4 /> },
    { title: "5", component: <Step5 /> },
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
                margin: '0 90%',
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
                position: 'absolute'
              }}

              stepCustomStyle={{color: 'var(--bg-color-500)', fontWeight: '600'}}

            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Form;
