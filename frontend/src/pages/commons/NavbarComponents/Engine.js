import React from "react";

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

function Engine() {
  return (
    <div style={engineContainerStyle}>
      <h2 style={headerStyle}>Comprehensive Engine Service at Car Care 360</h2>
      <p style={paragraphStyle}>At Car Care 360, we understand the importance of a well-maintained engine for the overall performance of your vehicle. Our expert technicians are dedicated to providing comprehensive engine services to ensure optimal functionality and longevity.</p>

      <div>
        <div style={{ marginBottom: "20px" }}>
          <h3 style={sectionTitleStyle}>Our Engine Services Include:</h3>
          <ul style={{ paddingLeft: "0", listStyleType: "none" }}>
            <li style={{ marginBottom: "8px" }}>Engine Diagnostics: Utilizing advanced diagnostic tools to identify and address any issues with your engine.</li>
            <li style={{ marginBottom: "8px" }}>Oil Change: Regular oil changes to keep your engine lubricated and running smoothly.</li>
            <li style={{ marginBottom: "8px" }}>Engine Tune-up: Fine-tuning your engine components for peak performance.</li>
            <li style={{ marginBottom: "8px" }}>Timing Belt Replacement: Ensuring the timely replacement of the timing belt to prevent engine damage.</li>
            {/* Add more engine services as needed */}
          </ul>
        </div>

        <div>
          <h3 style={sectionTitleStyle}>State-of-the-Art Equipment</h3>
          <p style={paragraphStyle}>We invest in the latest diagnostic equipment and tools to accurately assess the health of your engine. This allows us to provide precise and efficient services, saving you time and ensuring the reliability of your vehicle.</p>

          <h3 style={sectionTitleStyle}>Expert Technicians</h3>
          <p style={paragraphStyle}>Our team of skilled technicians is trained to work with various engine types and models. They undergo continuous training to stay updated on the latest advancements in engine technology.</p>

          <h3 style={sectionTitleStyle}>Preventive Maintenance</h3>
          <p style={paragraphStyle}>In addition to addressing current issues, we emphasize preventive maintenance to identify potential problems early on and avoid costly repairs in the future.</p>

          <h3 style={sectionTitleStyle}>Book Your Engine Service Today</h3>
          <p style={paragraphStyle}>Experience the difference of our dedicated engine services. Book your appointment today to ensure your engine operates at its best.</p>
        </div>
      </div>

      {/* Add more content as needed */}
    </div>
  );
}

export default Engine;
