import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FirePredictionForm from "./FirePredictionForm";
import Results from "./Results";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FirePredictionForm />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
}

export default App;
