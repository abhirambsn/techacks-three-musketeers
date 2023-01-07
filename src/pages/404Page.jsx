import React from "react";

const NotFoundPage = () => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--bg-color-700)",
        fontFamily: "'Roboto Slab', serif"
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px",
        }}
      >
        <h2>404</h2>
        <div
          style={{
            height: "30px",
            borderLeft: "2px solid var(--bg-color-700)",
          }}
        ></div>
        <h3>Oops! This Page was not Found</h3>
      </div>
    </div>
  );
};

export default NotFoundPage;
