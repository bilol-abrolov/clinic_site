import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DoctorDashboard from "./DoctorDashboard";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import Doctors from "./Doctors";
import './index.css'; 
import Products from "./Products";
import Settings from "./Settings";
import Logout from "./Logout";



function App() {
  return (
      <div className="flex">
        <div className="flex-1 p-4">
          <Routes>
            <Route path="/doctorDashboard" element={<DoctorDashboard />} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/products" element={<Products />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </div>
      </div>
  );
}

export default App;
