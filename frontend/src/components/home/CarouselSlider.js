import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import heroVid from "../videos/HeroVid.mp4";
import "./Hero.css";

export default function CarouselSlider() {
  return (
    <div className="video-background-holder">
      <div className="video-background-overlay"></div>
      <video playsInline autoPlay muted loop>
        <source src={heroVid} type="video/mp4" />
      </video>
      <div className="video-background-content container h-100">
        <div className="d-flex h-100 text-center align-items-center">
          <div className="w-100 text-white">
            <h1 className="heroTitle">Your Trusted Car Care partner</h1>
            <div className="heroTxt">We Keep Your Car Running Smoothly</div>
            <Link to="/Service-booking">
              <Button variant="primary mr-2 mt-3 mb-2 bookBtn">
                Book a Service
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
