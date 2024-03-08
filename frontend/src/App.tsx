import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Onboarding from './pages/Onboarding';
import Auth from './pages/Auth';
import AboutYou from './pages/onboarding/AboutYou';
import CoverPhotoUpload from './pages/onboarding/CoverPhotoAsk';
import PDFUpload from './pages/onboarding/PDFUploadPage';
import Bio from './pages/onboarding/Bio';
import Sales from './pages/sales/Sales';
import Home from './pages/dashboard/Home';
const App: React.FC = () => {
  return (
    <Router>
      <div className="App flex flex-col min-h-screen" style={{ backgroundColor: '#FAFAF9' }}>
        <Routes>
          <Route path="/" element={<Onboarding />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/coverphoto" element={<CoverPhotoUpload />} ></Route>
          <Route path="/pdfupload" element={<PDFUpload />} ></Route>


          {/* 
          <Route path="/aboutyou" element={<AboutYou />} ></Route>
          <Route path="/bio" element={<Bio />} ></Route>
           */}
          
          <Route path="/dashboard" element={<Home />} ></Route>
          <Route path="/sales" element={<Sales />} ></Route>
          <Route path="/analytics" element={<Sales />} ></Route>



        </Routes>
      </div>
    </Router>
  );
}

export default App;
