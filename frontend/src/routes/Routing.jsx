import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Home from "../pages/Home";
import Header from "../components/Header";
import Profile from "../pages/Profile";

const Routing = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<PublicRoute component={Login} />} />
        <Route path="/signup" element={<PublicRoute component={Signup} />} />
        <Route path="/profile" element={<PrivateRoute component={Profile} />} />
        <Route path="/" element={<PrivateRoute component={Home} />} />
      </Routes>
    </Router>
  );
};

export default Routing;

