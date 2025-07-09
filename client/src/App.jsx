import React from "react";
import Home from "./pages/Home";
import LiveMap from "./pages/LiveMap";
import Auth from "./pages/Auth";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/livemap" element={<LiveMap />} />
    </Routes>
  );
}

export default App;
