import React, { useEffect } from "react";
import CarouselSlider from "../components/home/CarouselSlider";
import OurServices from "../components/home/OurServices";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { role } = useAuth();

  useEffect(() => {
    if (role === "customer") {
      navigate("/customerDashboard");
    } else if (role === "maintenancemanager") {
      navigate("/MaintananceManagerDashboard");
    }
  }, []);
  return (
    <div>
      <CarouselSlider />
      <OurServices />
    </div>
  );
};

export default Home;
