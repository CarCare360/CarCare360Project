import React from "react";
import unauthorizedImg from "../components/images/unauthorized.jpg";

const Unauthorized = () => {
  return (
    <div>
      <img
        src={unauthorizedImg}
        alt="Unauthorized"
        style={{ width: "25%", height: "25%", marginTop: "5%" }}
      />
      <h2 className=" align-content-center">
        You are not authorized! Please go back
      </h2>
    </div>
  );
};

export default Unauthorized;
