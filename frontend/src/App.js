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
import ManufacturerRecommendation from "./pages/ManufacturerRecommendation";
import RegisterVehicle from "./pages/RegisterVehicle";
import AdminDashboard from "./pages/dashboard/index";
import MaybeShowNavbarComp from "./pages/commons/MaybeShowNavbarComp";
import MaybeShowFooter from "./pages/commons/MaybeShowFooter";
import Forum from "./pages/dashboard/services/Forum";
import MessageSystem from "./pages/dashboard/services/MessageSystem";
import Chat from "./pages/messaging/pages/Chat";
import SetAvatar from "./pages/messaging/pages/SetAvatar";
import ChatLogin from "./pages/messaging/pages/ChatLogin";
import ChatRegister from "./pages/messaging/pages/ChatRegister";


library.add(faEnvelope, faKey);

function App() {
  return (
    <Router>

      <div className='App'>
        <MaybeShowNavbarComp>
          <NavbarComp />
        </MaybeShowNavbarComp>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/service-booking" element={<Booking />} />
          <Route path="/register-vehicle" element={<RegisterVehicle />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route
            path="/manufacturer-recommendation"
            element={<ManufacturerRecommendation />}
          />
          <Route path="/forum" element={<Forum />} />
          <Route path="/message-system" element={<MessageSystem />} />

          <Route path="/chat-login" element={<ChatLogin />} />
          <Route path="/chat-register" element={<ChatRegister />} />
          <Route path="/chat" element={<Chat />} />

          <Route path="/setAvatar" element={<SetAvatar />} />

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
