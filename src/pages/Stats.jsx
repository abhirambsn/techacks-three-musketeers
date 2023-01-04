import React, { useLayoutEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useLoaderData, useLocation } from "react-router-dom";
import useAccount from "../hooks/useAccount";
import useProvider from "../hooks/useProvider";
import { getDaysFromDeadline } from "../utils/functions";
import {
  checkVote,
  voteForNextStage,
  createVote,
  checkUserVote,
  completeStageVoting,
} from "../utils/interact";

const Stats = () => {
  const campaignData = useLoaderData();
  const provider = useProvider();
  const { address } = useAccount(provider);
  const [powText, setPowText] = useState("");
  const [voted, setVoted] = useState({ voted: false, vote: null });
  const location = useLocation();

  useLayoutEffect(() => {
    (async () => {
      setVoted(
        await checkUserVote(
          campaignData.address,
          address,
          campaignData.currentStage
        )
      );
    })();
  }, [location, address]);
  return (
    <section className="section stats" id="stats">
      <div className="stats-grid padd-5">
        <div className="stats-grid stats-box">
          <div className="grid-20 stats-btn">
            <button className="btn">
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
                    : "Not Started"}
                </div>
                <div>
                  {campaignData.currentStage == i + 1
                    ? "In Progress"
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
                                onClick={async () =>
                                  await voteForNextStage(
                                    campaignData.address,
                                    i + 1,
                                    address,
                                    true
                                  )
                                }
                                disabled={
                                  campaignData.author === address ||
                                  i + 1 !== campaignData.currentStage ||
                                  stageData.voted ||
                                  voted.voted
                                }
                                className={
                                  campaignData.author === address ||
                                  i + 1 !== campaignData.currentStage ||
                                  stageData.voted ||
                                  voted.voted
                                    ? "btn-disabled"
                                    : "btn-inverse"
                                }
                              >
                                Yes
                              </button>
                              <button
                                onClick={async () =>
                                  await voteForNextStage(
                                    campaignData.address,
                                    i + 1,
                                    address,
                                    false
                                  )
                                }
                                disabled={
                                  campaignData.author === address ||
                                  i + 1 !== campaignData.currentStage ||
                                  stageData.voted ||
                                  voted.voted
                                }
                                className={
                                  campaignData.author === address ||
                                  i + 1 !== campaignData.currentStage ||
                                  stageData.voted ||
                                  voted.voted
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
                        </>
                      ) : (
                        <>
                          <button
                            onClick={async () => {
                              await createVote(
                                campaignData.address,
                                i + 1,
                                powText
                              );
                              setPowText("");
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
                              (window.location.href = `/testing/results/${
                                campaignData.address
                              }/${i + 1}`)
                            }
                          >
                            Results
                          </button>
                          <button
                            onClick={async () =>
                              await completeStageVoting(
                                campaignData.address,
                                campaignData.currentStage
                              )
                            }
                          >
                            Complete Voting for test
                          </button>
                          {i + 1 === campaignData.currentStage &&
                            getDaysFromDeadline(
                              campaignData.stages[campaignData.currentStage - 1]
                                ?.deadline
                            ) <= 1 &&
                            !stageData.created && (
                              <textarea
                                value={powText}
                                onChange={(e) => setPowText(e.target.value)}
                                placeholder="Proof of work"
                              ></textarea>
                            )}
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

{
  /* <div className='grid-20 stats-table-body'>
                <div>2</div>
                <div>100</div>
                <div>100 days</div>
                <div>Impressive</div>
                <div>
                  <button className='btn-inverse'>Yes</button>
                  <button className='btn-inverse'>No</button>
                </div>
              </div>
              <div className='grid-20 stats-table-body'>
                <div>3</div>
                <div>100</div>
                <div>100 days</div>
                <div>Impressive</div>
                <div>
                  <button className='btn-inverse'>Yes</button>
                  <button className='btn-inverse'>No</button>
                </div>
              </div>
              <div className='grid-20 stats-table-body'>
                <div>4</div>
                <div>100</div>
                <div>100 days</div>
                <div>Impressive</div>
                <div>
                  <button className='btn-inverse'>Yes</button>
                  <button className='btn-inverse'>No</button>
                </div>
              </div> */
}

export default Stats;
