import React, { useLayoutEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useLoaderData, useLocation, useNavigation } from "react-router-dom";
import {
  cancelCampaign,
  checkInvestorship,
  checkVote,
  createVote,
  fund,
  registerAsInvestor,
  releaseFundsToCampaigner,
  voteForNextStage,
  withdraw,
} from "../utils/interact";
import useAccount from "../hooks/useAccount";
import useProvider from "../hooks/useProvider";
import { getDaysFromDeadline, getMaticToINRPrice } from "../utils/functions";
import { completeCampaign } from "../utils/interact";
import { toast } from "react-hot-toast";
import LoaderComponent from "../components/LoaderComponent";

const Campaign = () => {
  const campaignData = useLoaderData();
  const provider = useProvider();
  const { address } = useAccount(provider);
  const [fundAmount, setFundAmount] = useState(0);
  const [registered, setRegistered] = useState(false);
  const [maticPrice, setMaticPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    if (!window.ethereum) {
      return;
    }

    (async () => {
      if (!address) return;
      setRegistered(await checkInvestorship(campaignData.address, address));
      if (maticPrice == 0) {
        setMaticPrice(await getMaticToINRPrice());
      }
      setLoading(false);
    })();
  }, [location, window.ethereum, address]);

  useLayoutEffect(() => {
    if (!loading) {
      if (!loading) {
        var element = document.getElementsByClassName("campaign-progress")[0];
        var w = element.dataset.progress;
        if (w >= 100) {
          w = 100;
        }
        element.style.width = `${w}%`;
      }
    }
  }, [loading, location]);
  return navigation.state === "loading" || loading ? (
    <LoaderComponent />
  ) : (
    <section className="section campaign" id="campaign">
      <div className="campaign-grid">
        <div className="grid-40 campaign-left">
          <div className="grid-50 padd-5">
            <a href="/list">
              <button className="btn-inverse">
                {" "}
                <FaArrowLeft className="campaign-btn" />
              </button>
            </a>
          </div>
          <div className="grid-50 padd-5 disp-no"></div>
          <div className="grid-20 disp-no"></div>
          <div className="grid-60 small-padd-5">
            <div className="campaign-img">
              <img src="https://picsum.photos/400/300" alt="img-desc" />
            </div>
          </div>
          <div className="grid-20 disp-no"></div>
          <div className="grid-20 disp-no"></div>
          <div className="grid-60 small-padd-5">
            <div className="campaign-progress-bar-holder">
              <div className="campaign-progress-bar"></div>
              <div
                className="campaign-progress"
                data-progress={
                  (campaignData.currentProgress /
                    campaignData.totalAmountNeeded) *
                  100
                }
              ></div>
            </div>
            <div className="campaign-progress-percent">
              Progress:{" "}
              {(
                (campaignData.currentProgress /
                  campaignData.totalAmountNeeded) *
                100
              ).toFixed(2)}
              % Funded
            </div>
          </div>
          <div className="grid-20 disp-no"></div>
          <div className="grid-20 disp-no"></div>
          <div className="grid-60 campaign-card-inverse">
            <div className="campaign-deadline">
              Deadline: {campaignData.projectDeadline}{" "}
              {getDaysFromDeadline(campaignData.projectDeadline) !== -1 && (
                <>
                  ({getDaysFromDeadline(campaignData.projectDeadline)} days
                  left)
                </>
              )}
            </div>
            <div className="campaign-target">
              Target: {campaignData.currentProgress}/
              {campaignData.totalAmountNeeded} MATIC
            </div>
            <div className="campaign-no-of-stages">
              No. of stages:{" "}
              {Math.round(
                campaignData.totalProjectTime / campaignData.stagePeriod
              )}
            </div>
            <div className="campaign-stage-period">
              Stage period: {campaignData.stagePeriod / 60 / 60 / 24} day(s)
            </div>
          </div>
          <div className="grid-20 disp-no"></div>
        </div>
        <div className="grid-60 campaign-right">
          <div className="campaign-head grid-100">
            <p>{campaignData.name}</p>
          </div>
          <div className="grid-100 campaign-desc">
            <div className="campaign-desc-head">
              <span>Description - </span>
            </div>
            <div className="campaign-desc-text">
              <p>{campaignData.desc}</p>
            </div>
          </div>
          <div className="grid-50 campaign-funds grid">
            <div className="grid-100 campaign-funds">
              {!registered && (
                <button
                  className="btn-theme"
                  onClick={async () => {
                    document.addEventListener("click", (e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      document.body.style.pointerEvents = "none";
                      document.body.style.cursor = "progress";
                    });
                    const notification = toast.loading("Processing Request...");
                    const result = await registerAsInvestor(
                      campaignData.address,
                      address
                    );
                    if (result) {
                      toast.success("Registration Successful!!", {
                        id: notification,
                      });
                      setTimeout(() => window.location.reload(), 1000);
                    } else {
                      toast.error("Registration Failed", { id: notification });
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
                  Register as Investor
                </button>
              )}
            </div>
            <div className="grid-100 campaign-funds">
              <a href={`/campaign/${campaignData.address}/stats`}>
                <button className="btn-theme">View Stages</button>
              </a>
            </div>
            {campaignData.author === address && (
              <>
                <div className="grid-100 campaign-funds">
                  <button
                    onClick={async () => {
                      document.addEventListener("click", (e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        document.body.style.pointerEvents = "none";
                        document.body.style.cursor = "progress";
                      });
                      const notification = toast.loading(
                        "Processing Request..."
                      );
                      const result = await completeCampaign(
                        campaignData.address
                      );
                      if (result) {
                        toast.success("Campaign marked as complete", {
                          id: notification,
                        });
                        setTimeout(() => window.location.reload(), 1000);
                      } else {
                        toast.error("Error occurred while processing request", {
                          id: notification,
                        });
                      }
                      document.body.style.pointerEvents = "auto";
                      document.removeEventListener("click", (e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        document.body.style.pointerEvents = "none";
                        document.body.style.cursor = "progress";
                      });
                    }}
                    className={
                      campaignData.currentStage <=
                      Math.round(
                        campaignData.totalProjectTime / campaignData.stagePeriod
                      )
                        ? "btn-disabled"
                        : "btn-theme"
                    }
                    disabled={
                      campaignData.currentStage <=
                      Math.round(
                        campaignData.totalProjectTime / campaignData.stagePeriod
                      )
                    }
                  >
                    Mark as complete
                  </button>
                </div>
                <div className="grid-100 campaign-funds">
                  <button
                    onClick={async () => {
                      const confirmation = confirm(
                        "Confirm Release of the funds"
                      );
                      document.addEventListener("click", (e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        document.body.style.pointerEvents = "none";
                        document.body.style.cursor = "progress";
                      });
                      if (confirmation) {
                        const notification = toast.loading(
                          "Processing request..."
                        );
                        const result = await releaseFundsToCampaigner(
                          campaignData.address
                        );
                        if (result) {
                          toast.success(
                            `Funds for Stage ${campaignData.currentStage} have been released`,
                            { id: notification }
                          );
                          setTimeout(() => window.location.reload(), 1000);
                        } else {
                          toast.error(
                            "Error Occurred cannot release funds contact at support@crowdfundr.org"
                          );
                        }
                      } else {
                        toast.error("Request Cancelled");
                      }
                      document.body.style.pointerEvents = "auto";
                      document.removeEventListener("click", (e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        document.body.style.pointerEvents = "none";
                        document.body.style.cursor = "progress";
                      });
                    }}
                    disabled={
                      campaignData.currentStage !== 1 &&
                      !campaignData.stages[campaignData.currentStage - 1].voted
                    }
                    className={
                      campaignData.currentStage !== 1 &&
                      !campaignData.stages[campaignData.currentStage - 1].voted
                        ? "btn-disabled"
                        : "btn-theme"
                    }
                  >
                    Release funds
                  </button>
                </div>
              </>
            )}
          </div>
          <div className="grid-50 campaign-form">
            <div className="grid-100 campaign-funds">
              <input
                className="campaign-funds-input"
                type="number"
                disabled={!registered}
                value={fundAmount}
                onChange={(e) => setFundAmount(e.target.value)}
              />{" "}
            </div>
            <div className="grid-100 campaign-inr">
              <p>INR: {(maticPrice * fundAmount).toFixed(2)} INR</p>
            </div>
            <div className="grid-100 campaign-funds">
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
                    "Transaction in progress..."
                  );
                  const result = await fund(
                    campaignData.address,
                    address,
                    fundAmount
                  );
                  if (result) {
                    toast.success("Funding successful", { id: notification });
                    setTimeout(() => window.location.reload(), 1000);
                  } else {
                    toast.error("Transaction failed", { id: notification });
                  }
                  document.removeEventListener("click", (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    document.body.style.pointerEvents = "none";
                    document.body.style.cursor = "progress";
                  });
                }}
              >
                Fund campaign
              </button>
            </div>
          </div>
          <div className="grid-50"></div>
          {registered && (
            <div className="grid-50 campaign-funds">
              <button
                className="btn-theme"
                onClick={async () => {
                  document.addEventListener("click", (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    document.body.style.pointerEvents = "none";
                    document.body.style.cursor = "progress";
                  });
                  const notification = toast.loading("Processing withdrawal");
                  const result = await withdraw(campaignData.address, address);
                  if (result) {
                    toast.success("Withdrawal successful", {
                      id: notification,
                    });
                    setTimeout(() => window.location.reload(), 1000);
                  } else {
                    toast.error("Withdrawal failed", { id: notification });
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
                Withdraw Funds
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Campaign;
