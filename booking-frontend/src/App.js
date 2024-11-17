import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
// import PropertyList from "./pages/PropertyList";
import PropertyDetails from "./pages/PropertyDetails";
import AvailableProperties from "./components/AvailableProperties";
import Footer from "./components/Footer";
import BookingForm from "./components/BookingForm";

const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/properties" element={<AvailableProperties />} />
      <Route path="/property/:id" element={<PropertyDetails/>} />
      <Route path="/booking/:id" element={<BookingForm />} />
    </Routes>
    <Footer/>
  </Router>
);

export default App;
