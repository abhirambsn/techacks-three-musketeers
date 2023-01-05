import React from "react";
import { MoonLoader } from "react-spinners";

const LoaderComponent = () => {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <MoonLoader size={60} color="#5F6FDD" />
    </div>
  );
};

export default LoaderComponent;
