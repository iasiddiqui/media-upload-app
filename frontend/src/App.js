// App.js (correct setup)
import React from "react";
import { Routes, Route } from "react-router-dom";
import ListingPage from './pages/ListingPage';
import UploadPage from './pages/UploadPage';
import VideoPage from './pages/VideoPage';
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/header" element={<Header />} />
        <Route path="/" element={<ListingPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/video/:id" element={<VideoPage />} />
      </Routes>
    </div>
  );
}

export default App;
