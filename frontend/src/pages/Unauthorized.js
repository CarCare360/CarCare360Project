import React from "react";
import unauthorizedImg from "../components/images/unauthorized.jpg";
import useAuth from "../hooks/useAuth";

const Unauthorized = () => {
  const { role } = useAuth();
  console.log(role);
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
