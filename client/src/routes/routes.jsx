import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {About,Booking,Contact,Gallery,History,Home,NotFound,Packages,Services} from "../pages/Index";

const AppRoutes = () => {
  return (
    <Router basename="/">
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/history" element={<History />} />
        <Route path="/" element={<Home />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/services" element={<Services />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
