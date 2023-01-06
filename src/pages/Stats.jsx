import React, { useLayoutEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa";
import { useLoaderData, useLocation, useNavigation } from "react-router-dom";
import LoaderComponent from "../components/LoaderComponent";
import useAccount from "../hooks/useAccount";
import useProvider from "../hooks/useProvider";
import { disableClick, getDaysFromDeadline } from "../utils/functions";
import {
  voteForNextStage,
  createVote,
  checkUserVote,
  completeStageVoting,
  getVoteOfUser,
} from "../utils/interact";

const Stats = () => {
  const campaignData = useLoaderData();
  const provider = useProvider();
  const { address } = useAccount(provider);
  const [voted, setVoted] = useState({ voted: true, vote: null });
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    (async () => {
      setVoted({
        voted: await checkUserVote(
          campaignData.address,
          address,
          campaignData.currentStage
        ),
        vote: await getVoteOfUser(
          campaignData.address,
          address,
          campaignData.currentStage
        ),
      });
      setLoading(false);
    })();
  }, [location, address]);

  return navigation.state === "loading" || loading ? (
    <LoaderComponent />
  ) : (
    <section className="section stats" id="stats">
      <div className="stats-grid padd-5">
        <div className="stats-grid stats-box">
          <div className="grid-20 stats-btn">
            <button
              className="btn"
              onClick={() =>
                (window.location.href = `/campaign/${campaignData.address}`)
              }
            >
              <FaArrowLeft className="campaign-btn" />
            </button>
          </div>
          <div className="grid-80 stats-head">Campaign Stages</div>
          <div className="grid-100 stats-table">
            <div className="grid-20 stats-table-head">
              <div>S.No.</div>
              <div>Amount Needed</div>
              <div>Deadline</div>
              <div>Remarks</div>
              <div>Vote</div>
            </div>
            {campaignData?.stages.map((stageData, i) => (
              <div className="grid-20 stats-table-body" key={i}>
                <div>{i + 1}</div>
                <div>{stageData.amount}</div>
                <div>
                  {getDaysFromDeadline(campaignData.projectDeadline) !== -1
                    ? stageData.deadline.toLocaleDateString("en-IN", {
                        dateStyle: "medium",
                      })
                    : stageData.voted
                    ? "Completed"
                    : "Not Started"}
                </div>
                <div>
                  {campaignData.currentStage == i + 1
                    ? "In Progress"
                    : stageData.voted
                    ? "Stage Completed"
                    : "Not Started"}
                </div>
                <div>
                  {getDaysFromDeadline(campaignData.projectDeadline) !== -1 ? (
                    <>
                      {address !== campaignData.author ? (
                        <>
                          {!voted.voted ? (
                            <>
                              <button
                                onClick={async () => {
                                  document.addEventListener(
                                    "click",
                                    disableClick
                                  );
                                  const notification =
                                    toast.loading("Processing vote...");
                                  const result = await voteForNextStage(
                                    campaignData.address,
                                    i + 1,
                                    address,
                                    true
                                  );
                                  if (result) {
                                    toast.success("Vote casted successfully", {
                                      id: notification,
                                    });
                                    setTimeout(
                                      () => window.location.reload(),
                                      1000
                                    );
                                  } else {
                                    toast.error("Voting Failed", {
                                      id: notification,
                                    });
                                    document.body.style.pointerEvents = "auto";
                                    document.body.style.cursor = "auto";
                                  }
                                  document.removeEventListener(
                                    "click",
                                    disableClick
                                  );
                                }}
                                disabled={
                                  campaignData.author === address ||
                                  i + 1 !== campaignData.currentStage ||
                                  stageData.voted ||
                                  voted.voted ||
                                  !stageData.created
                                }
                                className={
                                  campaignData.author === address ||
                                  i + 1 !== campaignData.currentStage ||
                                  stageData.voted ||
                                  voted.voted ||
                                  !stageData.created
                                    ? "btn-disabled"
                                    : "btn-inverse"
                                }
                              >
                                Yes
                              </button>
                              <button
                                onClick={async () => {
                                  document.addEventListener(
                                    "click",
                                    disableClick
                                  );
                                  const notification =
                                    toast.loading("Processing vote...");
                                  const result = await voteForNextStage(
                                    campaignData.address,
                                    i + 1,
                                    address,
                                    false
                                  );
                                  if (result) {
                                    toast.success("Vote casted successfully", {
                                      id: notification,
                                    });
                                    setTimeout(
                                      () => window.location.reload(),
                                      1000
                                    );
                                  } else {
                                    toast.error("Voting Failed", {
                                      id: notification,
                                    });
                                    document.body.style.pointerEvents = "auto";
                                    document.body.style.cursor = "auto";
                                  }
                                  document.removeEventListener(
                                    "click",
                                    disableClick
                                  );
                                }}
                                disabled={
                                  campaignData.author === address ||
                                  i + 1 !== campaignData.currentStage ||
                                  stageData.voted ||
                                  voted.voted ||
                                  !stageData.created
                                }
                                className={
                                  campaignData.author === address ||
                                  i + 1 !== campaignData.currentStage ||
                                  stageData.voted ||
                                  voted.voted ||
                                  !stageData.created
                                    ? "btn-disabled"
                                    : "btn-inverse"
                                }
                              >
                                No
                              </button>
                            </>
                          ) : (
                            <button className="btn-disabled">
                              {!stageData.created
                                ? "Vote not created"
                                : `Voted: ${voted.vote ? "Yes" : "No"}`}
                            </button>
                          )}
                          <button
                            className={
                              stageData.created ? "btn-inverse" : "btn-disabled"
                            }
                            disabled={!stageData.created}
                            onClick={() =>
                              (window.location.href = `/results/${
                                campaignData.address
                              }/${i + 1}`)
                            }
                          >
                            Results
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={async () => {
                              const proofOfWorkLink = prompt(
                                "Enter the video link for your Proof of Work so that backers can see your work"
                              );
                              if (proofOfWorkLink.length <= 0) {
                                toast.error("Invalid Link");
                                return;
                              }
                              if (
                                !proofOfWorkLink.match(
                                  /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
                                )
                              ) {
                                toast.error("Invalid Link");
                                return;
                              }
                              document.addEventListener("click", disableClick);
                              const notification =
                                toast.loading("Creating Vote...");
                              const result = await createVote(
                                campaignData.address,
                                i + 1,
                                proofOfWorkLink
                              );
                              if (result) {
                                toast.success("Vote created!", {
                                  id: notification,
                                });
                                setTimeout(
                                  () => window.location.reload(),
                                  1000
                                );
                              } else {
                                toast.error("Failed to create vote", {
                                  id: notification,
                                });
                                document.body.style.pointerEvents = "auto";
                                document.body.style.cursor = "auto";
                              }
                              document.removeEventListener(
                                "click",
                                disableClick
                              );
                            }}
                            className={
                              i + 1 !== campaignData.currentStage ||
                              !(
                                getDaysFromDeadline(
                                  campaignData.stages[
                                    campaignData.currentStage - 1
                                  ]?.deadline
                                ) <= 1
                              ) ||
                              stageData.created
                                ? "btn-disabled"
                                : "btn-inverse"
                            }
                            disabled={
                              i + 1 !== campaignData.currentStage ||
                              !(
                                getDaysFromDeadline(
                                  campaignData.stages[
                                    campaignData.currentStage - 1
                                  ]?.deadline
                                ) <= 1
                              ) ||
                              stageData.created
                            }
                          >
                            {stageData.created ? "Vote Created" : "Create Vote"}
                          </button>
                          <button
                            className={
                              stageData.created ? "btn-inverse" : "btn-disabled"
                            }
                            disabled={!stageData.created}
                            onClick={() =>
                              (window.location.href = `/results/${
                                campaignData.address
                              }/${i + 1}`)
                            }
                          >
                            Results
                          </button>
                          {/* <button
                            onClick={async () => {
                              document.addEventListener("click", disableClick);
                              const result = await completeStageVoting(
                                campaignData.address,
                                campaignData.currentStage
                              );
                              if (result) {
                                alert("Voting completed");
                                window.location.reload();
                              }
                              document.body.style.pointerEvents = "auto";
                              document.body.style.cursor = "auto";
                              document.removeEventListener(
                                "click",
                                disableClick
                              );
                            }}
                          >
                            Complete Voting for test
                          </button> */}
                        </>
                      )}
                    </>
                  ) : (
                    <div>Project not started yet</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
