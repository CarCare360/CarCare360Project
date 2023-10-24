import React from "react";
import Card from 'react-bootstrap/Card';

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

const PricingCard = ({ title, content }) => (
  <Card style={{ marginBottom: "20px" }}>
    <Card.Body>
      <Card.Title>{title}</Card.Title>
      <Card.Text>{content}</Card.Text>
    </Card.Body>
  </Card>
);

function Pricing() {
  return (
    <div style={pricingContainerStyle}>
      <h2 style={headerStyle}>Transparent and Affordable Pricing at Car Care 360</h2>
      <p style={paragraphStyle}>At Car Care 360, we believe in providing transparent pricing for our services and packages. Explore our competitive rates and choose the options that best suit your vehicle's needs.</p>

      <div>
        <PricingCard
          title="Service Packages"
          content="We offer a variety of service packages designed to meet the different needs of our customers. Whether it's routine maintenance or specific repairs, our packages are crafted to provide value for your investment."
        />

        <PricingCard
          title="Basic Maintenance Package"
          content="Oil Change, Brake Inspection, Tire Rotation"
        />

        <PricingCard
          title="Comprehensive Service Package"
          content="Engine Tune-up, Brake Pad Replacement, Fluid Flushes, Diagnostic Check"
        />
      </div>

      <div>
        <PricingCard
          title="Individual Services"
          content="For those who prefer individual services, we provide a detailed breakdown of pricing for each service. Our competitive rates ensure you get quality service without breaking the bank."
        />

        <PricingCard
          title="Special Offers and Discounts"
          content="Keep an eye out for our special offers and discounts on select services. We frequently update our promotions to provide additional value to our customers."
        />

        <PricingCard
          title="Customized Quotes"
          content="If you have specific needs or require a customized service package, feel free to reach out to us. We can provide personalized quotes based on your vehicle's requirements."
        />

        <PricingCard
          title="Contact Us for a Quote"
          content="For a detailed quote or to inquire about our current promotions, contact our service team. We're here to assist you and provide the best service at affordable prices."
        />
      </div>

      {/* Add more content as needed */}
    </div>
  );
}

export default Pricing;
