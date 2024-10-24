import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="h-[100vh]  text-gray-900 bg-white flex justify-center items-center">
      <div className="w-[30vw] bg-gray-400 bg-opacity-10 border border-slate-400 rounded-md p-8 shadow-xl backdrop-filter backdrop-blur-[4px]  relative">
        <h1 className="text-4xl font-bold text-center mb-6">Sign up</h1>
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
            <Link className="text-white px-2" to="/Form">

              Create an Account
            </Link>
          </button>
        </form>
        <div className="text-center">
          <span className="m-4">
            Already have an Account!
            <Link
              className="text-blue-500 hover:underline hover: underline-offset-1 px-2 text-[18px]"
              to="/"
            >
              Login
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
