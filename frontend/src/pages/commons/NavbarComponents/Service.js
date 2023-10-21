import React from "react";

const serviceContainerStyle = {
  maxWidth: "800px",
  margin: "auto",
  padding: "70px",
  borderRadius: "8px",
  backgroundColor: "transparent", // Set to transparent
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

const listStyle = {
  paddingLeft: "20px",
  listStyleType: "none",
};

const listItemStyle = {
  marginBottom: "8px",
};

const paragraphStyle = {
  lineHeight: "1.6",
};

function Service() {
  return (
    <div style={serviceContainerStyle}>
      <h2 style={headerStyle}>Welcome to Car Care 360 Services</h2>
      <p style={paragraphStyle}>At Car Care 360, we are dedicated to providing top-notch care for your vehicle.</p>

      <div>
        <div style={{ marginBottom: "20px" }}>
          <h3 style={sectionTitleStyle}>Types of Services</h3>
          <ul style={listStyle}>
            <li style={listItemStyle}>Regular Maintenance</li>
            <li style={listItemStyle}>Engine Diagnostics</li>
            <li style={listItemStyle}>Brake Inspection and Repair</li>
            <li style={listItemStyle}>Oil Change</li>
            {/* Add more services as needed */}
          </ul>
        </div>

        <div>
          <h3 style={sectionTitleStyle}>Specialized Technicians</h3>
          <p style={paragraphStyle}>Our team of experienced and certified technicians specializes in handling a wide range of vehicle issues. Whether it's routine maintenance or complex repairs, your vehicle is in capable hands.</p>

          <h3 style={sectionTitleStyle}>Service Packages</h3>
          <p style={paragraphStyle}>Explore our service packages designed to meet the unique needs of different vehicles. From basic maintenance to comprehensive overhauls, Car Care 360 has you covered.</p>

          <h3 style={sectionTitleStyle}>Special Offers</h3>
          <p style={paragraphStyle}>Take advantage of our special offers and discounts on select services. At Car Care 360, we believe in providing quality service at affordable prices.</p>

          <h3 style={sectionTitleStyle}>Appointment Scheduling</h3>
          <p style={paragraphStyle}>Book your service appointment online for a hassle-free experience. Our online scheduling system allows you to choose a convenient time for your service.</p>
        </div>
      </div>

      {/* Add more sections as needed */}
    </div>
  );
}

export default Service;
