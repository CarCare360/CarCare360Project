import React from "react";

const pricingContainerStyle = {
  maxWidth: "800px",
  margin: "auto",
  padding: "70px",
  borderRadius: "8px",
  backgroundColor: "transparent",
};

const headerStyle = {
  color: "#343a40",
  textAlign: "center",
};

const sectionTitleStyle = {
  color: "#007bff",
  borderBottom: "2px solid #007bff",
  paddingBottom: "10px",
  marginBottom: "10px",
};

const subSectionTitleStyle = {
  color: "#007bff",
  marginBottom: "10px",
};

const paragraphStyle = {
  lineHeight: "1.6",
};

function Pricing() {
  return (
    <div style={pricingContainerStyle}>
      <h2 style={headerStyle}>Transparent and Affordable Pricing at Car Care 360</h2>
      <p style={paragraphStyle}>At Car Care 360, we believe in providing transparent pricing for our services and packages. Explore our competitive rates and choose the options that best suit your vehicle's needs.</p>

      <div>
        <h3 style={sectionTitleStyle}>Service Packages</h3>
        <p style={paragraphStyle}>We offer a variety of service packages designed to meet the different needs of our customers. Whether it's routine maintenance or specific repairs, our packages are crafted to provide value for your investment.</p>

        <h4 style={subSectionTitleStyle}>Basic Maintenance Package</h4>
        <p style={paragraphStyle}>Oil Change, Brake Inspection, Tire Rotation</p>

        <h4 style={subSectionTitleStyle}>Comprehensive Service Package</h4>
        <p style={paragraphStyle}>Engine Tune-up, Brake Pad Replacement, Fluid Flushes, Diagnostic Check</p>
      </div>

      <div>
        <h3 style={sectionTitleStyle}>Individual Services</h3>
        <p style={paragraphStyle}>For those who prefer individual services, we provide a detailed breakdown of pricing for each service. Our competitive rates ensure you get quality service without breaking the bank.</p>

        <h3 style={sectionTitleStyle}>Special Offers and Discounts</h3>
        <p style={paragraphStyle}>Keep an eye out for our special offers and discounts on select services. We frequently update our promotions to provide additional value to our customers.</p>

        <h3 style={sectionTitleStyle}>Customized Quotes</h3>
        <p style={paragraphStyle}>If you have specific needs or require a customized service package, feel free to reach out to us. We can provide personalized quotes based on your vehicle's requirements.</p>

        <h3 style={sectionTitleStyle}>Contact Us for a Quote</h3>
        <p style={paragraphStyle}>For a detailed quote or to inquire about our current promotions, contact our service team. We're here to assist you and provide the best service at affordable prices.</p>
      </div>

      {/* Add more content as needed */}
    </div>
  );
}

export default Pricing;
