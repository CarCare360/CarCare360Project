import React from "react";

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

function Brakes() {
  return (
    <div style={brakesContainerStyle}>
      <h2 style={headerStyle}>Expert Brake Services for Your Safety at Car Care 360</h2>
      <p style={paragraphStyle}>At Car Care 360, we prioritize your safety on the road. Trust our expert technicians to provide reliable brake maintenance and repair services to keep your vehicle's braking system in top condition.</p>

      <div>
        <div style={{ marginBottom: "20px" }}>
          <h3 style={sectionTitleStyle}>Our Brake Services Include:</h3>
          <ul style={{ paddingLeft: "0", listStyleType: "none" }}>
            <li style={{ marginBottom: "8px" }}>Brake Inspection: Thorough examination of your braking system to identify any signs of wear or damage.</li>
            <li style={{ marginBottom: "8px" }}>Brake Pad Replacement: Timely replacement of brake pads to maintain optimal braking performance.</li>
            <li style={{ marginBottom: "8px" }}>Brake Fluid Flush: Regular flushing of brake fluid to ensure proper function and prevent brake system issues.</li>
            <li style={{ marginBottom: "8px" }}>Brake Caliper Service: Inspection and servicing of brake calipers for smooth operation.</li>
            {/* Add more brake services as needed */}
          </ul>
        </div>

        <div>
          <h3 style={sectionTitleStyle}>State-of-the-Art Brake Technology</h3>
          <p style={paragraphStyle}>We stay ahead in technology, utilizing advanced tools and equipment to address modern brake systems. Our technicians are trained to work with various brake types, ensuring precise and effective service.</p>

          <h3 style={sectionTitleStyle}>Signs Your Brakes Need Attention:</h3>
          <ul style={{ paddingLeft: "0", listStyleType: "none" }}>
            <li>Squeaking or grinding noises during braking</li>
            <li>Reduced brake responsiveness</li>
            <li>Unusual vibrations or pulsations</li>
            <li>Brake warning light on your dashboard</li>
          </ul>

          <h3 style={sectionTitleStyle}>Preventive Brake Maintenance</h3>
          <p style={paragraphStyle}>Prevent brake issues before they become serious. Schedule regular brake maintenance to keep your vehicle's braking system in optimal condition, enhancing safety and extending the life of brake components.</p>

          <h3 style={sectionTitleStyle}>Book Your Brake Service Today</h3>
          <p style={paragraphStyle}>Ensure your peace of mind on the road. Book your brake service appointment with us today, and let our experts take care of your vehicle's braking needs.</p>
        </div>
      </div>

      {/* Add more content as needed */}
    </div>
  );
}

export default Brakes;
