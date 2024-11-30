import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Detail from "./pages/Detail";
import Home from "./pages/Home";

const App = () => {
  const [isOwner, setIsOwner] = useState(true);

  return (
    <Router>
      <Navbar setIsOwner={setIsOwner} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail" element={<Detail isOwner={isOwner} />} />
      </Routes>
    </Router>
  );
};

export default App;
