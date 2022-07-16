import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import WarehousePage from "./pages/warehouse";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/warehouse/:id" element={<WarehousePage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}
