import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import "./index.css";
import Listing from "./pages/Listing";
import {
  getAllCampaigns,
  getCampaignDetails,
  getVotingResults,
} from "./utils/loaders";
import Campaign from "./pages/Campaign";
import { getStages } from "./utils/interact";
import Stats from "./pages/Stats";
import NewCampaign from "./pages/NewCampaign";
import { Toaster } from "react-hot-toast";
import ResultPage from "./pages/ResultPage";
import Form from "./pages/Form"

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/list",
    element: <Listing />,
    loader: getAllCampaigns,
  },
  {
    path: "/new",
    element: <NewCampaign />,
  },
  {
    path: "/campaign/:campaignAddress",
    element: <Campaign />,
    loader: async ({ params }) => {
      const cDetail = await getCampaignDetails(params.campaignAddress);
      const stageDetail = await getStages(
        cDetail.address,
        Math.round(cDetail.totalProjectTime / cDetail.stagePeriod)
      );
      return {
        ...cDetail,
        stages: stageDetail,
      };
    },
  },
  {
    path: "/campaign/:campaignAddress/stats",
    element: <Stats />,
    loader: async ({ params }) => {
      const cDetail = await getCampaignDetails(params.campaignAddress);
      const stageDetail = await getStages(
        cDetail.address,
        Math.round(cDetail.totalProjectTime / cDetail.stagePeriod)
      );
      return {
        ...cDetail,
        stages: stageDetail,
      };
    },
  },
  {
    path: "/result",
    element: <ResultPage />,
  },
  {
    path: "/results/:campaignAddress/:stage",
    element: <ResultPage />,
    loader: async ({ params }) => {
      return await getVotingResults(params.campaignAddress, params.stage);
    },
  },
  {
    path: '/form',
    element: <Form />
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Toaster position="top-center" />
    <RouterProvider router={router} />
  </React.StrictMode>
);
