import React from "react";

import MainNav from "../MainNav";
import Pitch from "../Pitch";

import backupImg from "../../assets/serverless.png";

import "./index.css";

const header = () => {
  return (
    <div className="header">
      <video
        style={{
          objectFit: "cover",
          width: "100%",
          height: "100%",
        }}
        poster={backupImg}
        autoPlay
        loop
      >
        {/* <source src={mp4} type='video/mp4' /> */}
        {/* <source src={webm} type='video/webm' /> */}
      </video>
      <div className="header-content">
        <MainNav />
        <Pitch />
      </div>
    </div>
  );
};

export default header;
