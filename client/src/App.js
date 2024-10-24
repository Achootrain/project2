import React from "react";
import Nav from "./component/Intro/Nav";
import Register from "./component/Register";
import Intro from "./component/Intro/Intro";
import Login from "./component/Login";
import "./App.css";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Intro />}></Route>
        <Route path="/Login" element={<Login />} />
        <Route path="/Nav" element={<Nav />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
