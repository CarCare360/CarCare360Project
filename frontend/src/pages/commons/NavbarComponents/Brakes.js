import React from "react";
import Card from 'react-bootstrap/Card';

const brakesContainerStyle = {
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

const paragraphStyle = {
  lineHeight: "1.6",
};

const BrakeServiceCard = ({ title, description }) => (
  <Card style={{ marginBottom: "20px" }}>
    <Card.Body>
      <Card.Title>{title}</Card.Title>
      <Card.Text>{description}</Card.Text>
    </Card.Body>
  </Card>
);

function Brakes() {
  return (
    <div style={brakesContainerStyle}>
      <h2 style={headerStyle}>Expert Brake Services for Your Safety at Car Care 360</h2>
      <p style={paragraphStyle}>At Car Care 360, we prioritize your safety on the road. Trust our expert technicians to provide reliable brake maintenance and repair services to keep your vehicle's braking system in top condition.</p>

      <div>
        <BrakeServiceCard
          title="Brake Inspection"
          description="Thorough examination of your braking system to identify any signs of wear or damage."
        />
        <BrakeServiceCard
          title="Brake Pad Replacement"
          description="Timely replacement of brake pads to maintain optimal braking performance."
        />
        <BrakeServiceCard
          title="Brake Fluid Flush"
          description="Regular flushing of brake fluid to ensure proper function and prevent brake system issues."
        />
        <BrakeServiceCard
          title="Brake Caliper Service"
          description="Inspection and servicing of brake calipers for smooth operation."
        />
        {/* Add more brake services as needed */}
      </div>

      <div>
        <h3 style={sectionTitleStyle}>State-of-the-Art Brake Technology</h3>
        <p style={paragraphStyle}>We stay ahead in technology, utilizing advanced tools and equipment to address modern brake systems. Our technicians are trained to work with various brake types, ensuring precise and effective service.</p>

        {/* Add more sections as needed */}
      </div>

      {/* Add more content as needed */}
    </div>
  );
}

export default Brakes;
