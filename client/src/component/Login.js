import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdEmail } from "react-icons/md";

import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";

const Login = ({ showLogin, setShowLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleShowPass = () => {
    setShowPass(!showPass);
  };
  const handleLogin = (e) => {
    const account = {
      email: email,
      password: password,
    };
    console.log(account);
  };

  return (
    <>
      {showLogin && (
        <div>
          <div className="h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-[2px]">
            <div className="w-[340px] h-[420px] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4  bg-white
            rounded-3xl animate-fadeIn shadow-[0_0_15px_3px_rgba(255,255,255,0.6)]">
              <div className=" relative text-gray-900">
                <div className="flex justify-center items-center ">
                  <h1 className="text-3xl font-bold text-center mb-6 pt-4" >
                    Login
                  </h1>
                  <IoCloseOutline className="absolute top-0 right-0 text-3xl font-bold text-gray-950 cursor-pointer" onClick={() => setShowLogin(false)} />
                </div>
                <form action="">
                  <div className="relative my-4 p-2 pt-4 border-2 border-black rounded-lg">
                    <input
                      type="email"
                      className="block w-72 py-2.3 px-0 text-lg bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0  focus:border-blue-600 peer"
                      onChange={(e) => setEmail(e.target.value)}
                    ></input>

                    <label
                      htmlFor=""
                      className="absolute text-lg  duration-300 transform -translate-y-5 scale-75 top-4  -z-10 origin-[0] peer-focus:left peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75"
                    >
                      Email
                    </label>
                    <MdEmail className="absolute right-3 top-4 size-6"></MdEmail>
                  </div>
                  <div className="relative mb-2 p-2 pt-4 border-2 border-black rounded-lg">
                    <input
                      type={showPass ? "text" : "password"}
                      className="block w-72 py-2.3 px-0 text-lg bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0  focus:border-blue-600 peer"
                      onChange={(e) => setPassword(e.target.value)}
                    ></input>
                    <label
                      htmlFor=""
                      className="absolute text-lg  duration-300 transform -translate-y-5 scale-75  top-4 -z-10 origin-[0] peer-focus:left peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 "
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
                    className="w-full mb-4 py-2 text-[18px] mt-6 rounded-lg bg-red-600 text-black hover:bg-black hover:text-white"
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
          </div>
        </div>
      )}
    </>
  );
};

export default Login;