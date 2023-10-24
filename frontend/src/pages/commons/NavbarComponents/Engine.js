import React from "react";
import Card from 'react-bootstrap/Card';

const engineContainerStyle = {
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

const EngineServiceCard = ({ title, description }) => (
  <Card style={{ marginBottom: "20px" }}>
    <Card.Body>
      <Card.Title>{title}</Card.Title>
      <Card.Text>{description}</Card.Text>
    </Card.Body>
  </Card>
);

function Engine() {
  return (
    <div style={engineContainerStyle}>
      <h2 style={headerStyle}>Comprehensive Engine Service at Car Care 360</h2>
      <p style={paragraphStyle}>At Car Care 360, we understand the importance of a well-maintained engine for the overall performance of your vehicle. Our expert technicians are dedicated to providing comprehensive engine services to ensure optimal functionality and longevity.</p>

      <div>
        <EngineServiceCard
          title="Engine Diagnostics"
          description="Utilizing advanced diagnostic tools to identify and address any issues with your engine."
        />
        <EngineServiceCard
          title="Oil Change"
          description="Regular oil changes to keep your engine lubricated and running smoothly."
        />
        <EngineServiceCard
          title="Engine Tune-up"
          description="Fine-tuning your engine components for peak performance."
        />
        <EngineServiceCard
          title="Timing Belt Replacement"
          description="Ensuring the timely replacement of the timing belt to prevent engine damage."
        />
        {/* Add more engine services as needed */}
      </div>

      <div>
        <h3 style={sectionTitleStyle}>State-of-the-Art Equipment</h3>
        <p style={paragraphStyle}>We invest in the latest diagnostic equipment and tools to accurately assess the health of your engine. This allows us to provide precise and efficient services, saving you time and ensuring the reliability of your vehicle.</p>

        {/* Add more sections as needed */}
      </div>

      {/* Add more content as needed */}
    </div>
  );
}

export default Engine;
