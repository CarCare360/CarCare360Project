import './App.css';
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './pages/commons/Footer';
import NavbarComp from './pages/commons/NavbarComp';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';
import Booking from './pages/Booking';
import PageNotFound from './pages/PageNotFound';
import ManufacturerRecommendation from './pages/dashboard/services/ManufacturerRecommendation';
import RegisterVehicle from './pages/dashboard/services/RegisterVehicle';
import AdminDashboard from './pages/dashboard/index';
import MaybeShowNavbarComp from './pages/commons/MaybeShowNavbarComp';
import MaybeShowFooter from './pages/commons/MaybeShowFooter';
import Forum from './pages/dashboard/services/Forum';
import MessageSystem from './pages/dashboard/services/MessageSystem';
import DoesNotRememberPassword from './pages/DoesNotRememberPassword';
import VerifyPassword from './pages/VerifyPassword';

library.add(faEnvelope, faKey);

function App() {
  return (
    <Router>
      <div className='App'>
        <MaybeShowNavbarComp>
          <NavbarComp />
        </MaybeShowNavbarComp>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Register />} />
          <Route path='/AdminDashboard' element={<AdminDashboard />} />
          <Route path='/service-booking' element={<Booking />} />
          <Route path='/AdminDashboard/register-vehicle' element={<RegisterVehicle />} />
          <Route
            path='/AdminDashboard/manufacturer-recommendation'
            element={<ManufacturerRecommendation />}
          />
          <Route path='/AdminDashboard/forum' element={<Forum />} />
          <Route path='/AdminDashboard/message-system' element={<MessageSystem />} />
          <Route path='/forgot-password' element={<DoesNotRememberPassword />} />
          <Route path="/password-reset/:id" element={<VerifyPassword />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>

        <MaybeShowFooter>
          <Footer />
        </MaybeShowFooter>
      </div>
    </Router>
  );
}

export default App;
