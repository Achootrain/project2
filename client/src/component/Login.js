import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import axios from "axios";

import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleShowPass = () => {
    setShowPass(!showPass);
  };
  const handleLogin = async (e) => {
    // e.preventDefault()
    const account = { username, password };
    try {
      // send login request.
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/users/login`,
        account
      );
      // response
      console.log("RESPONSE: ", res.data);
    } catch (e) {
      console.error(e.response.data.message);
    }
  };

  return (
    <div className="h-[100vh]  text-black bg-white flex justify-center items-center">
      <div className="bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
        <h1 className="text-4xl text-white font-bold text-center mb-6">
          Login
        </h1>
        <form action="">
          <div className="relative my-8 p-2 pt-4 border-2 border-black rounded-lg">
            <input
              type="text"
              className="block w-72 py-2.3 px-0 text-lg text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
              onChange={(e) => setUsername(e.target.value)}
            ></input>

            <label
              htmlFor=""
              className="absolute text-lg text-white duration-300 transform -translate-y-5 scale-75 top-4  -z-10 origin-[0] peer-focus:left peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75"
            >
              Username
            </label>
            <MdEmail className="absolute right-3 top-4 size-6"></MdEmail>
          </div>
          <div className="relative my-8 p-2 pt-4 border-2 border-black rounded-lg">
            <input
              type={showPass ? "text" : "password"}
              className="block w-72 py-2.3 px-0 text-lg text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <label
              htmlFor=""
              className="absolute text-lg text-white duration-300 transform -translate-y-5 scale-75  top-4 -z-10 origin-[0] peer-focus:left peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 "
            >
              Password
            </label>
            <button
              type="button"
              className="absolute right-3 top-4"
              onClick={handleShowPass}
            >
              {showPass ? (
                <FaEye className="size-6" />
              ) : (
                <FaEyeSlash className="size-6" />
              )}
            </button>
          </div>
          <div className="flex justify-between items-center ">
            <div className="flex">
              <input type="checkbox" name="" id=""></input>
              <label htmlFor="">Remember Me</label>
            </div>
            <Link to="" className="text-blue-500">
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full mb-4 py-2 text-[18px] mt-6 rounded-full bg-white text-black hover:bg-black hover:text-white"
            onClick={handleLogin}
          >
            Login
          </button>
        </form>
        <div className="flex justify-center">
          <span>
            New Here?
            <Link className="text-blue-500 px-2" to="/Register">
              Create an Account
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
