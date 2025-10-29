//import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login"
import Protected from "./components/protected";

const App = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/protected" element={<Protected />} />
    </Routes>
  </Router>
);

export default App;