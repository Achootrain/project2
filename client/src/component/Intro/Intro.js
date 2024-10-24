import React, { useState } from "react";
import Nav from "./Nav";
import BG1 from "../../assets/img/bg.jpg";
import Login from "../Login";
import Register from "../Register";

const BGStyle1 = {
  backgroundImage: `url(${BG1})`, // Sử dụng dấu backticks cho template string
  backgroundRepeat: "no-repeat",
  backgroundPosition: "top",
  backgroundSize: "cover",
  width: "100%", // Chiều rộng toàn màn hình
  height: "100%", // Chiều cao toàn màn hình
};

const Intro = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const HandleLogin = () => {
    setShowLogin(true);
  };
  const HandleSignup = () => {
    setShowSignup(true);
  };

  return (
    <div style={BGStyle1} className="m-0">
      <Nav HandleLogin={HandleLogin} HandleSignup={HandleSignup} />
      <Login showLogin={showLogin} setShowLogin={setShowLogin} setShowSignup={setShowSignup} />
      <Register showSignup={showSignup} setShowSignup={setShowSignup} setShowLogin={setShowLogin} />
    </div>
  );
};

export default Intro;
