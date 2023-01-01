import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import "./index.css";
import Listing from "./pages/Listing";
import { getAllCampaigns } from "./utils/loaders";
import Testing from "./pages/Testing";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/list",
    element: <Listing />,
  },
  {
    path: "/testing",
    element: <Testing />,
    loader: getAllCampaigns
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
