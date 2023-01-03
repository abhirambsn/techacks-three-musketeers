import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import "./index.css";
import Listing from "./pages/Listing";
import { getAllCampaigns, getCampaignDetails } from "./utils/loaders";
import Testing from "./pages/Testing";
import Campaign from "./pages/Campaign";
import TestingCampaign from "./pages/TestingCampaignPage";
import { getStages } from "./utils/interact";
import Stats from "./pages/Stats";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/list",
    element: <Listing />,
    loader: getAllCampaigns
  },
  {
    path: '/campaign/:campaignAddress',
    element: <Campaign />,
    loader: async ({params}) => {
      const cDetail = await getCampaignDetails(params.campaignAddress);
      const stageDetail = await getStages(cDetail.address, Math.round(cDetail.stagePeriod / cDetail.totalProjectTime));
      return {
        ...cDetail,
        ...stageDetail
      }
    }
  },
  {
    path: "/testing",
    element: <Testing />,
    loader: getAllCampaigns
  },
  {
    path: "/stats",
    element: <Stats />
  },
  {
    path: "/testing/:campaignAddress",
    element: <TestingCampaign />,
    loader: async ({params}) => {
      const cDetail = await getCampaignDetails(params.campaignAddress);
      const stageDetail = await getStages(cDetail.address, Math.round(cDetail.totalProjectTime / cDetail.stagePeriod));
      return {
        ...cDetail,
        stages: stageDetail
      }
    }
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
