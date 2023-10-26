import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/login.css";
import login from "../components/images/login.jpg";
import swal from "sweetalert";
import { gapi } from "gapi-script";

import { GoogleLogin } from "react-google-login";
import {
  Container,
  Row,
  Col,
  Form,
  Grid,
  Button,
  InputGroup,
  Modal,
} from "react-bootstrap";
import { data } from "./dashboard/components/BarChart";

const clientId =
  "610163124901-aqk5761tb2nsqq35mjid80lu4047elnt.apps.googleusercontent.com";

const Login = () => {
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = React.useState(false);
  useState(null);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  useEffect(() => {
    const storedEmail = localStorage.getItem("rememberedEmail");
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
    if (storedEmail) {
      setEmail(storedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
    } else {
      setValidated(false);

      e.preventDefault();
      try {
        const response = await axios.post(
          "https://car-care-360.onrender.com/api/authentication/login",
          {
            email: email,
            password: password,
          }
        );
        console.log("Login Success");
        console.log(response.data);
        if (response.data) {
          setOpen(true);
          localStorage.setItem("token", response.data.token);
          if (rememberMe) {
            localStorage.setItem("rememberedEmail", email);
          } else {
            localStorage.removeItem("rememberedEmail");
          }
          setEmail("");
          setPassword("");
          if (response.data.success) {
            console.log(response.data.role);
            if (response.data.role === "admin") {
              navigate("/Admindashboard");
            } else if (response.data.role == "maintenancemanager") {
              navigate("/MaintananceManagerDashboard");
            } else if (response.data.role == "marketingmanager") {
              navigate("/sendEmail");
            } else {
              navigate("/CustomerDashboard");
            }
          }
        } else {
          swal("Invalid Credential!", "", "error"); 
          setEmail("");
          setPassword("");
        }
      } catch (error) {
        swal("Invalid Credential!", "", "error"); 
        setEmail("");
        setPassword("");
      }
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const onSuccess = (res) => {
    console.log("LOGIN SUCCESS! Current user: ", res.profileobj);
  };

  const onFailure = (res) => {
    console.log("LOGIN FAILED! res: ", res);
  };

  return (
    <Container>
      <div className="login__customer__container ">
        <Row container spacing={2}>
          {/* Left side with register customer image */}
          <Col item xs={12} md={6}>
            <div className="login__customer__img">
              <img src={login}></img>
            </div>
          </Col>

          {/* Right side with form components */}
          <Col item xs={12} md={6}>
            <h2
              data-testid="cypress-title"
              className="login__customer__heading"
            >
              {" "}
              Customer Login{" "}
            </h2>

            {/* Form */}
            <div className="login__customer__form">
              <Form
                noValidate
                validated={validated}
                onSubmit={handleLogin}
                className="text-left"
              >
                <Row className=" pb-2">
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label className="d-flex justify-content-start">
                      Email
                    </Form.Label>
                    <Form.Control
                      type="email"
                      pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                      placeholder="Enter Email"
                      required
                      value={email}
                      width={100}
                      onChange={(e) => setEmail(e.target.value)}
                    />{" "}
                    <Form.Control.Feedback type="invalid">
                      *Please enter a valid E-mail
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className=" pb-2">
                  <Form.Group as={Col} controlId="formGridpassword">
                    <Form.Label className="d-flex justify-content-start">
                      Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      required
                      minLength={6}
                      maxLength={20}
                      value={password}
                      width={100}
                      placeholder="Enter Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      *Please enter valid password above 6 characters
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <div class="container d-flex justify-content-center">
                  <Button
                    variant="primary"
                    type="submit"
                    className=" mt-2 justify-content-center"
                  >
                    LOGIN
                  </Button>
                </div>
                <div className="login__customer__form__line">
                  <div className="forgot__password">
                    <p>
                      <Link to="/forgot-password">Forgot Password?</Link>
                    </p>
                  </div>
                  {/* Remember Me */}
                  <div className="remember__me">
                    <Form.Check
                      type="checkbox"
                      label="Remember me"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                  </div>
                </div>

                {/* Already have an account */}
                <div className="already__have__an__account">
                  <p>
                    Don't have an account? <Link to="/signup">Create</Link>
                  </p>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Login;
