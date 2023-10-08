import "./App.css";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./pages/commons/Footer";
import NavbarComp from "./pages/commons/NavbarComp";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import Booking from "./pages/Booking";
import PageNotFound from "./pages/PageNotFound";
import ManufacturerRecommendation from "./pages/dashboard/services/ManufacturerRecommendation";
import RegisterVehicle from "./pages/dashboard/services/RegisterVehicle";
import AdminDashboard from "./pages/dashboard/index";
import MaybeShowNavbarComp from "./pages/commons/MaybeShowNavbarComp";
import MaybeShowFooter from "./pages/commons/MaybeShowFooter";
import Forum from "./pages/dashboard/services/forum/Forum";
import Discussion from "./pages/dashboard/services/forum/DiscussionPage";

import MessageSystem from "./pages/dashboard/services/MessageSystem";
import DoesNotRememberPassword from "./pages/DoesNotRememberPassword";
import VerifyPassword from "./pages/VerifyPassword";
import Chat from "./pages/dashboard/services/messaging/pages/Chat";
import ChatLogin from "./pages/dashboard/services/messaging/pages/ChatLogin";
import ChatRegister from "./pages/dashboard/services/messaging/pages/ChatRegister";

import CustomerDashboard from "./pages/customerDash";
import UserRegVehicle from "./pages/customerDash/services/UserRegVehicle";
import RegUserBooking from "./pages/customerDash/services/RegUserBooking";
import ManufacturerRecommendationView from "./pages/customerDash/services/ManufacturerRecommendation";

library.add(faEnvelope, faKey);

function App() {
  return (
    <Router>
      <div className="App">
        <MaybeShowNavbarComp>
          <NavbarComp />
        </MaybeShowNavbarComp>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/service-booking" element={<Booking />} />
          <Route
            path="/AdminDashboard/register-vehicle"
            element={<RegisterVehicle />}
          />
          <Route
            path="/AdminDashboard/manufacturer-recommendation"
            element={<ManufacturerRecommendation />}
          />
          <Route path="/AdminDashboard/forum" element={<Forum />} />
          <Route path="/AdminDashboard/discussion" element={<Discussion />} />
          <Route path="/AdminDashboard/message-system" element={<Chat />} />
          <Route path="/chat-login" element={<ChatLogin />} />
          <Route path="/chat-register" element={<ChatRegister />} />
          <Route
            path="/forgot-password"
            element={<DoesNotRememberPassword />}
          />
          <Route
            exact
            path="/passwordreset/:resetToken"
            element={<VerifyPassword />}
          />

          <Route path="/CustomerDashboard" element={<CustomerDashboard />} />
          <Route
            path="/CustomerDashboard/register-vehicle"
            element={<UserRegVehicle />}
          />
          <Route
            path="/CustomerDashboard/booking"
            element={<RegUserBooking />}
          />
          <Route
            path="/CustomerDashboard/manufacturer-recommendation"
            element={<ManufacturerRecommendationView />}
          />
          <Route path="/CustomerDashboard/forum" element={<Forum />} />
          <Route
            path="/CustomerDashboard/discussion"
            element={<Discussion />}
          />
          <Route path="/CustomerDashboard/message-system" element={<Chat />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>

        <MaybeShowFooter>
          <Footer />
        </MaybeShowFooter>
      </div>
    </Router>
  );
}

export default App;
