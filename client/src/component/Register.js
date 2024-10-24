import React from "react";
import { Link } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";

const Register = ({ showSignup, setShowSignup, setShowLogin }) => {
  return (
    <>
      {showSignup && (
        <div>
          <div className="h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-[2px]">
            <div className="sm:w-[80vw] md:w-[60vw] lg:w-[50vw] xl:w-[26vw] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-slate-400 rounded-3xl p-8 
             bg-white animate-fadeIn shadow-[0_0_15px_3px_rgba(255,255,255,0.6)]">
              <div className="flex justify-center items-center ">
                <h1 className="text-4xl font-bold text-center mb-6 ">Sign up</h1>
                <IoCloseOutline className="absolute top-2 right-2 text-3xl font-bold text-gray-950 cursor-pointer"
                  onClick={() => setShowSignup(false)} />
              </div>
              <form action="">
                {/* Tên người dùng */}
                <div className="relative my-4 p-2 pt-4 border border-black rounded-lg hover:border-amber-500">
                  <input
                    type="email"
                    required
                    className="block w-full py-2.3 px-0 text-lg bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  ></input>
                  <label
                    htmlFor=""
                    className="absolute text-lg  duration-300 transform -translate-y-5 scale-75  top-4 -z-10 origin-[0] peer-focus:left peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75"
                  >
                    Full name
                  </label>
                </div>

                {/* User name */}
                <div className="relative my-4 p-2 pt-4 border border-black rounded-lg hover:border-amber-500">
                  <input
                    type="email"
                    required
                    className="block w-full py-2.3 px-0 text-lg bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  ></input>
                  <label
                    htmlFor=""
                    className="absolute text-lg  duration-300 transform -translate-y-5 scale-75  top-4 -z-10 origin-[0] peer-focus:left peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75"
                  >
                    User name
                  </label>
                </div>
                <div className="relative my-4 p-2 pt-4 border border-black rounded-lg hover:border-amber-500">
                  <input
                    type="email"
                    required
                    className="block w-full py-2.3 px-0 text-lg bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  ></input>
                  <label
                    htmlFor=""
                    className="absolute text-lg  duration-300 transform -translate-y-5 scale-75  top-4 -z-10 origin-[0] peer-focus:left peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75"

                  >
                    Email
                  </label>
                </div>

                <div className="relative my-4 p-2 pt-4 border border-black rounded-lg hover:border-amber-500">
                  <input
                    type="password"

                    className="block w-full py-2.3 px-0 text-lg  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  ></input>
                  <label
                    htmlFor=""
                    className="absolute text-lg  duration-300 transform -translate-y-5 scale-75  top-4 -z-10 origin-[0] peer-focus:left peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 "

                  >
                    Password
                  </label>
                </div>


                <div className="relative my-4 p-2 pt-4 border border-black rounded-lg hover:border-amber-600 ">
                  <input
                    type="password"
                    className="block w-full py-2.3 px-0 text-lg  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  ></input>
                  <label
                    htmlFor=""
                    className="absolute text-lg  duration-300 transform -translate-y-5 scale-75  top-4 -z-10 origin-[0] peer-focus:left peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75"

                  >
                    Confirm password
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full mb-4 py-2 text-[18px] mt-6 rounded-lg bg-green-600  hover:bg-green-700"
                >
                  <span className="text-white px-2">

                    Create an Account
                  </span>
                </button>
              </form>
              <div className="text-center">
                <span className="m-4">
                  Already have an Account!
                  <span
                    className="text-blue-500 hover:underline hover: underline-offset-1 px-2 text-[18px]"
                    onClick={() => {
                      setShowLogin(true);
                      setShowSignup(false);
                    }
                    }
                  >
                    Login
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
