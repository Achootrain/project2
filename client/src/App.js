import React from "react";
import Nav from "./component/Home/Nav";
import Register from "./component/Register";
import Home from "./component/Home/Home";
import Login from "./component/Login";
import Form from "./component/Form";
import './App.css';
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Login" element={<Login />} />
        <Route path="/Nav" element={<Nav />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Form" element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;
