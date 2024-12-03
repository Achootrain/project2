import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function Register() {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const navigate = useNavigate();

  // bien nay de kiem tra xem mk nhap lai co dung ko
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (password === confirmPass) setShowError(false);
    else setShowError(true);
  }, [confirmPass, password]);

  // Handle register ===================== author: Hai
  const handleRegister = async (e) => {
    e.preventDefault();
    const newAccount = { name: fullName, username, email, password };

    try {
      if (newAccount.name.trim() === "")
        throw new Error("Name can not be empty !");
      if (newAccount.username.trim() === "")
        throw new Error("Username can not be empty !");

      const res = await axios.post(
        `${process.env.REACT_APP_SERVER}/users/sign-up`,
        newAccount
      );

      // Đăng ký thành công
      if (res?.data?.success) {
        console.log(res.data);
        setTimeout(() => {
          navigate("/page/Login");
        }, 200);
      } else throw new Error("Response err !");
    } catch (err) {
      if (err.code === "ERR_NETWORK") {
        console.error("Server is NOT responding !");
        alert("🫤 Server is NOT responding !");
      } else {
        console.error(err.message);
      }
    }
  };
  // =====================================================

  return (
    <div className="h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-[2px]">
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-4  bg-white
      rounded-3xl animate-fadeIn shadow-[0_0_15px_3px_rgba(255,255,255,0.6)] flex flex-col items-center"
      >
        <h1 className="text-4xl font-bold text-center mb-6">Sign up</h1>
        <form action="" className="grid grid-cols-2 gap-x-4  ">
          {/* Tên người dùng */}
          <div className=" relative my-2 p-2 pt-4 border-2 border-black rounded-lg col-span-2">
            <input
              type="text"
              className="block w-full py-2.3 px-0 text-lg bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              onChange={(e) => setFullName(e.target.value)}
            ></input>
            <label
              htmlFor=""
              className="absolute text-lg  duration-300 transform -translate-y-5 scale-75  top-4 -z-10 origin-[0] peer-focus:left peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75"
            >
              Full name
            </label>
          </div>

          {/* Email */}
          <div className="relative  my-2 p-2 pt-4 border-2 border-black rounded-lg col-span-2">
            <input
              type="email"
              className="block w-full py-2.3 px-0 text-lg bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <label
              htmlFor=""
              className="absolute text-lg  duration-300 transform -translate-y-5 scale-75  top-4 -z-10 origin-[0] peer-focus:left peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75"
            >
              Email
            </label>
          </div>

          {/* User name */}
          <div className="relative my-2 p-2 pt-4 border-2 border-black rounded-lg col-span-2">
            <input
              type="text"
              className="block w-full py-2.3 px-0 text-lg bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              onChange={(e) => setUsername(e.target.value)}
            ></input>
            <label
              htmlFor=""
              className="absolute text-lg  duration-300 transform -translate-y-5 scale-75  top-4 -z-10 origin-[0] peer-focus:left peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75"
            >
              User name
            </label>
          </div>

          {/* Password */}
          <div className="relative my-2 p-2 pt-4 border-2 border-black rounded-lg">
            <input
              className="block w-full border-b-2 border-gray-300  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <label
              htmlFor=""
              className="absolute text-lg  duration-300 transform -translate-y-5 scale-75  top-4 -z-10 origin-[0] peer-focus:left peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 "
            >
              Password
            </label>
          </div>

          {/*Confirm Password */}

          <div
            className={`relative  my-2 p-2 pt-4 border-2 rounded-lg ${
              showError ? "border-red-600" : "border-black"
            } `}
          >
            <input
              className="block w-full py-2.3 px-0 text-lg  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              onChange={(e) => setConfirmPass(e.target.value)}
            ></input>
            <label
              htmlFor=""
              className="absolute text-lg  duration-300 transform -translate-y-5 scale-75  top-4 -z-10 origin-[0] peer-focus:left peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75"
            >
              Confirm password
            </label>
          </div>
        </form>

        {/* Hien thong bao nhap mk ko dung */}
        {showError ? (
          <div className="text-red-600">Confirm password doesn't match</div>
        ) : (
          <div></div>
        )}

        {/* Nut tao tk moi */}
        <button
          disabled={
            showError ||
            !username ||
            !fullName ||
            !email ||
            !password ||
            !confirmPass
          }
          type="submit"
          className="w-1/2 mb-4 py-2 text-[18px] mt-6 rounded-lg bg-red-600 text-black hover:bg-black hover:text-white"
          onClick={handleRegister}
        >
          Create an Account
        </button>
        <div className="flex justify-center">
          <span className="m-2">
            Already have an Account!
            <Link
              className="text-blue-500 hover:underline hover: underline-offset-1 px-2 text-[18px]"
              to="/page/Login"
            >
              Login
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Register;
