import { Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import engineImg from "../images/engine.png";
import detail from "../images/detail.png";
import oilChange from "../images/oilchange.png";
import electrical from "../images/electrical.png";
import wheelAllign from "../images/wheelallignment.png";
import ac from "../images/ac.png";
import recoveryImg from "../images/recoveryService.png";
import brandLogos from "../images/brandlogos.png";
import "./OurServices.css";

function OurServices() {
  const hotline = "01234567891";
  return (
    <>
      <section>
        <Container>
          <h2>Our Services</h2>
          <CardGroup className="cdGroup">
            <Card>
              <Card.Img variant="top" src={engineImg} />
              <Card.Body>
                <Card.Title>Engine Repairs</Card.Title>
                <div className="cardText">
                  Comprehensive engine repairs: diagnostics, maintenance, and
                  efficient solutions to keep your vehicle running smoothly.
                </div>
              </Card.Body>
            </Card>
            <Card>
              <Card.Img variant="top" src={detail} />
              <Card.Body>
                <Card.Title>Detailing Package</Card.Title>
                <div className="cardText">
                  Restore exteriors and interior with protective treatments.
                  Transform your vehicle with our professional services for a
                  stunning look.
                </div>
              </Card.Body>
            </Card>
            <Card>
              <Card.Img variant="top" src={oilChange} />
              <Card.Body>
                <Card.Title>Express Lube</Card.Title>
                <div className="cardText">
                  Efficient regular maintenance: inspections, fluid changes,
                  tune-ups. Keep your vehicle in top condition with scheduled
                  care.
                </div>
              </Card.Body>
            </Card>
          </CardGroup>

          <CardGroup className="cdGroup">
            <Card>
              <Card.Img variant="top" src={electrical} />
              <Card.Body>
                <Card.Title>Electical Repairs</Card.Title>
                <div className="cardText">
                  Expert auto electrician services: diagnostics, wiring,
                  repairs. Get reliable solutions for your vehicle's electrical
                  systems.
                </div>
              </Card.Body>
            </Card>
            <Card>
              <Card.Img variant="top" src={wheelAllign} />
              <Card.Body>
                <Card.Title>3D Wheel Alignment</Card.Title>
                <div className="cardText">
                  Achieve optimal tire angles, enhanced stability, and improved
                  handling. Experience smoother drives with our advanced
                  alignment solutions.
                </div>
              </Card.Body>
            </Card>
            <Card>
              <Card.Img variant="top" src={ac} />
              <Card.Body>
                <Card.Title>AC Repairs</Card.Title>
                <div className="cardText">
                  Diagnostics, repairs, and refrigerant recharge. Enjoy
                  comfortable rides with our professional air conditioning
                  services.
                </div>
              </Card.Body>
            </Card>
          </CardGroup>
        </Container>
      </section>
      <section>
        <Container>
          <div className="row align-items-center">
            <div className="col-md-6">
              <h2>24x7 Recovery Service</h2>
              <div className="recTxt">
                Roadside Repair Assistance Vehicle Breakdown Service Flat Tires
                (Tire punctures) Jump Start Towing Services
              </div>
              <a
                className="btn btn-primary btn-xlg"
                href={`tel:${hotline}`}
                style={{ padding: "20px", marginTop: "20px" }}
              >
                ☎️ Click to Call {hotline}
              </a>
            </div>
            <div className="col-md-6">
              <img src={recoveryImg} />
            </div>
          </div>
        </Container>
      </section>
      <section>
        <Container className="my-5">
          <h2>We Got All You Covered</h2>
          <img src={brandLogos} />
        </Container>
      </section>
    </>
  );
}

export default OurServices;
