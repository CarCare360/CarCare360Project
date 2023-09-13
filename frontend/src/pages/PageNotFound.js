import React from "react";
import img404 from "../components/images/404.png";

const PageNotFound = () => {
  return (
    <div>
      <img src={img404} alt="404-Page Not Found" className="w-50" />
      <h2 className=" align-content-center">Page Not Found!</h2>
    </div>
  );
};

export default PageNotFound;
