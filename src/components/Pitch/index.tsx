import React from "react";

import "./index.css";

const Pitch = () => {
  return (
    <div className="section-pitch">
      <h1>Serverless Website</h1>
      <p>Cognito authenticated React App</p>
      <button
        onClick={() => {
          window.location.href = "/members";
        }}
      >
        Join For Free
      </button>
    </div>
  );
};

export default Pitch;
