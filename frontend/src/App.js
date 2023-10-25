import "./App.css";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";

import RequireAuth from "./utils/RequireAuth";
import PrivateRoutes from "./utils/PrivateRoutes";
import Footer from "./pages/commons/Footer";
import NavbarComp from "./pages/commons/NavbarComp";
import { Route, Routes, HashRouter as Router } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import Booking from "./pages/Booking";
import PageNotFound from "./pages/PageNotFound";
import ManufacturerRecommendation from "./pages/dashboard/services/ManufacturerRecommendation";
import RegisterVehicle from "./pages/dashboard/services/RegisterVehicle";
import MaintananceManagerDashboard from "./pages/dashboard/index";
import MaybeShowNavbarComp from "./pages/commons/MaybeShowNavbarComp";
import MaybeShowFooter from "./pages/commons/MaybeShowFooter";
import Forum from "./pages/dashboard/services/forum/Forum";
import Discussion from "./pages/dashboard/services/forum/DiscussionPage";
import Service from "./pages/commons/NavbarComponents/Service";
import Engine from "./pages/commons/NavbarComponents/Engine";
import Brakes from "./pages/commons/NavbarComponents/Brakes";
import Pricing from "./pages/commons/NavbarComponents/Pricing";
import MessageSystem from "./pages/dashboard/services/MessageSystem";
import DoesNotRememberPassword from "./pages/DoesNotRememberPassword";
import VerifyPassword from "./pages/VerifyPassword";
import Chat from "./pages/dashboard/services/messaging/pages/Chat";
import ChatLogin from "./pages/dashboard/services/messaging/pages/ChatLogin";
import ChatRegister from "./pages/dashboard/services/messaging/pages/ChatRegister";
import SetAvatar from "./pages/dashboard/services/messaging/pages/SetAvatar";

import CustomerDashboard from "./pages/customerDash";
import UserRegVehicle from "./pages/customerDash/services/UserRegVehicle";
import RegUserBooking from "./pages/customerDash/services/RegUserBooking";
import ManufacturerRecommendationView from "./pages/customerDash/services/ManufacturerRecommendation";
import SendEmail from "./pages/SendEmail";
import Unauthorized from "./pages/Unauthorized";
import CreateGroups from "./pages/CreateGroups";


library.add(faEnvelope, faKey);

function App() {
  return (
    <Router>
      <div className="App">
        <MaybeShowNavbarComp>
          <NavbarComp />
        </MaybeShowNavbarComp>
        <Routes>
          {/* Public Routes */}{" "}
          <Route key="home" exact path="/" element={<Home />} />
          <Route key="login" path="/login" element={<Login />} />,
          <Route key="signup" path="/signup" element={<Register />} />,
          <Route path="/services" element={<Service/>} />
          <Route path="/engine" element={<Engine/>} />
          <Route path="/brakes" element={<Brakes/>} />
          <Route path="/pricing" element={<Pricing/>} />
          <Route
            path="/forgot-password"
            element={<DoesNotRememberPassword />}
          />
          <Route
            exact
            path="/passwordreset/:resetToken"
            element={<VerifyPassword />}
          />
          <Route path="/service-booking" element={<Booking />} />
          {/* Private Routes */}
          <Route element={<PrivateRoutes />}>
            <Route
              element={<RequireAuth allowedRoles={["maintenancemanager"]} />}
            >
              {" Maintenance manager specific routes "}

              <Route
                path="/MaintananceManagerDashboard"
                element={<MaintananceManagerDashboard />}
              />
              <Route
                path="/MaintananceManagerDashboard/register-vehicle"
                element={<RegisterVehicle />}
              />
              <Route
                path="/MaintananceManagerDashboard/manufacturer-recommendation"
                element={<ManufacturerRecommendation />}
              />
              <Route
                path="/MaintananceManagerDashboard/forum"
                element={<Forum />}
              />
              <Route
                path="/MaintananceManagerDashboard/discussion/:discussionId"
                element={<Discussion />}
              />
              <Route
                path="/MaintananceManagerDashboard/discussion"
                element={<Discussion />}
              />
              <Route
                path="/MaintananceManagerDashboard/message-system"
                element={<Chat />}
              />
            </Route>
            <Route element={<RequireAuth allowedRoles={["customer"]} />}>
              {" Customer specific routes "}
              <Route
                path="/CustomerDashboard/discussion/:discussionId"
                element={<Discussion />}
              />
              <Route
                path="/CustomerDashboard"
                element={<CustomerDashboard />}
              />
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
              <Route
                path="/CustomerDashboard/message-system"
                element={<Chat />}
              />
            </Route>

            {/* Marketing manager specific routes */}
            <Route
              element={<RequireAuth allowedRoles={["marketingmanager"]} />}
            >
              {" Marketing manager specific routes "}

              <Route
                key="sendemail"
                path="/sendEmail"
                element={<SendEmail />}
              />
              <Route
                key="createmailgroups"
                path="/createMailGroups"
                element={<CreateGroups />}
              />
            </Route>
            <Route path="/setAvatar" element={<SetAvatar />} />
          </Route>
          <Route path="/Unauthorized" element={<Unauthorized />} />
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
