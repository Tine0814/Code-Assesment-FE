import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import IdCheckPages from "./pages/IdCheckPages";
import ListOfEmplpoyeePage from "./pages/ListOfEmplpoyeePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IdCheckPages />} />
        <Route path="/employee/Attendance" element={<ListOfEmplpoyeePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
