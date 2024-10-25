import React from "react";
import Login from "./component/Login";
import Register from "./component/Register";
import Home from "./component/Home";
import ResetPassword from "./component/ResetPassword"
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Login" element={<Login />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/Register" element={<Register />} />

      </Routes>
    </div>
  );
}

export default App;
