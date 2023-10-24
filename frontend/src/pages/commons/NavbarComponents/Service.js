import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import complexrepair from '../../../components/images/complexrefair.jpg';
import packageservice from '../../../components/images/package.jpg';
import offer from '../../../components/images/offer.jpg';
import book from '../../../components/images/book.jpg';
import service from '../../../components/images/services.jpg';

const serviceContainerStyle = {
  margin: 'auto',
  padding: '70px',
  borderRadius: '8px',
  backgroundColor: 'transparent', // Set to transparent
};

const headerStyle = {
  color: '#343a40',
  textAlign: 'center',
};

const paragraphStyle = {
  lineHeight: '1.6',
};

const imageStyle = {
  height: '200px', // Set the desired height for your images
  objectFit: 'cover', // This property ensures the image covers the entire container
};

function GridExample() {
  return (
    <div style={serviceContainerStyle}>
      <h2 style={headerStyle}>Welcome to Car Care 360 Services</h2>
      <p style={paragraphStyle}>
        At Car Care 360, we are dedicated to providing top-notch care for your
        vehicle.
      </p>
      <Row className='justify-content-center'>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant='top' src={service} />
          <Card.Body>
            <Card.Title>Types of Services</Card.Title>
          </Card.Body>
          <ListGroup className='list-group-flush'>
            <ListGroup.Item>Regular Maintenance</ListGroup.Item>
            <ListGroup.Item>Engine Diagnostics</ListGroup.Item>
            <ListGroup.Item>Brake Inspection and Repair</ListGroup.Item>
            <ListGroup.Item>Oil Change</ListGroup.Item>
          </ListGroup>
          <Card.Body>
            <Card.Link href='/services'>Learn More</Card.Link>
          </Card.Body>
        </Card>
      </Row>
      <Row xs={1} md={4} className='g-4'>
        <Col>
          <Card style={{ height: '100%' }}>
            <Card.Img variant='top' src={complexrepair} style={imageStyle} />
            <Card.Body>
              <Card.Title>Specialized Technicians</Card.Title>
              <Card.Text>
                Our team of experienced and certified technicians specializes in
                handling a wide range of vehicle issues. Whether it's routine
                maintenance or complex repairs, your vehicle is in capable
                hands.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ height: '100%' }}>
            <Card.Img variant='top' src={packageservice} style={imageStyle} />
            <Card.Body>
              <Card.Title>Service Packages</Card.Title>
              <Card.Text>
                Explore our service packages designed to meet the unique needs
                of different vehicles. From basic maintenance to comprehensive
                overhauls, Car Care 360 has you covered.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ height: '100%' }}>
            <Card.Img variant='top' src={offer} style={imageStyle} />
            <Card.Body>
              <Card.Title>Special Offers</Card.Title>
              <Card.Text>
                Take advantage of our special offers and discounts on select
                services. At Car Care 360, we believe in providing quality
                service at affordable prices.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ height: '100%' }}>
            <Card.Img variant='top' src={book} style={imageStyle} />
            <Card.Body>
              <Card.Title>Appointment Scheduling</Card.Title>
              <Card.Text>
                Book your service appointment online for a hassle-free
                experience. Our online scheduling system allows you to choose a
                convenient time for your service.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default GridExample;
