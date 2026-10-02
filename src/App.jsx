import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { WorkforceProvider } from "./context/WorkforceContext";

import TopBar from "./components/TopBar";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./Hero";
import JobListingsPage from "./pages/candidate/JobListingsPage";
import CandidatePortal from "./pages/candidate/CandidatePortal";
import RegisterProfilePage from "./pages/candidate/RegisterProfilePage";
import LoginPage from "./pages/auth/LoginPage";
import AdminPortal from "./pages/admin/AdminPortal";
import AgencyPortal from "./pages/agency/AgencyPortal";
import About from "./About";
import Contact from "./contact";

function App() {
  return (
    <WorkforceProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <TopBar />
          <Header />

          <main className="flex-grow" id="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/jobs" element={<JobListingsPage />} />
              <Route path="/apply" element={<CandidatePortal />} />
              <Route path="/register" element={<RegisterProfilePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/admin" element={<AdminPortal />} />
              <Route path="/agency" element={<AgencyPortal />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </WorkforceProvider>
  );
}

export default App;