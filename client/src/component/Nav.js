import React from "react";
import { Link } from "react-router-dom";

//import BG2 from "../img/bg2.jpg";
/*
const BGStyle2 = {
  backgroundImage: `url(${BG2})`, // Sử dụng dấu backticks cho template string
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "cover",
  width: "100%",
  height: "450px",
  borderRadius: "15px",
};
*/
const Nav = ({ HandleLogin }) => {
  return (
    <div className="">
      <div class="content-wrapper font-karla max-w-screen-2xl text-base px-10 mx-auto">
        <header class="p-[28px] mx-auto text-white mb-10">
          <nav class="flex flex-row justify-between items-center relative">
            <div class="logo basis-1/6 text-start text-2xl font-semibold cursor-pointer ml-8">
              Logo
            </div>
            <ul
              id="tuan-top-menu"
              class="basis-4/6 hidden lg:flex lg:items-center lg:justify-end lg:gap-10 uppercase text-xl font-medium "
            >
              <li class="tuan-top-menu-item">
                <Link to="/">Home</Link>
              </li>
              <li class="tuan-top-menu-item">
                <Link to="/">Product</Link>
              </li>
              <li class="tuan-top-menu-item">
                <Link to="/">Blog</Link>
              </li>
              <li class="tuan-top-menu-item">
                <Link to="/">About</Link>
              </li>
              <li class="tuan-top-menu-item">
                <Link to="/">Contact</Link>
              </li>
            </ul>
            <ul class="basis-4/6 lg:basis-1/6 flex justify-end lg:justify-end items-center uppercase text-xl font-medium ml-[50px]">
              <div class="flex items-center cursor-pointer">
                <span
                  class="mx-4 lg:mx-20 uppercase border-2 rounded-md w-max tracking-wider px-4 py-2 text-xl font-semibold
                    hover:text-gray-950 hover:bg-white hover:shadow-[0_0_15px_3px_rgba(255,255,255,0.6)]"
                  onClick={HandleLogin}
                >
                  Sign In
                </span>
              </div>
            </ul>
            <div class=" px-2 sm:px-8 basis-1/6 lg:hidden flex items-center cursor-pointer">
              <svg id="tuan-menu-click" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke-width="1.5" stroke="currentColor" class="tuan-icon">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </div>
          </nav>
        </header>
        <main class="">
          <div class="h-[450px] mx-auto mb-4 " /*style={BGStyle2}*/>
            <div class=" w-full h-full flex justify-start items-center bg-gray-700 border border-white 
             bg-opacity-50  rounded-xl">
              <div class="relative h-full flex items-center justify-center ml-16">

                <div
                  class="h-[90%] w-1 bg-gradient-to-b from-purple-500 via-green-600 to-white shadow-[0_0_15px_3px_rgba(255,255,255,0.6)] ">
                </div>

                <div
                  class=" absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 border-gray-300 border-2 rounded-full">
                </div>
                <div
                  class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-3 border-gray-300 border-2 rounded-full">
                </div>
              </div>

              <div class=" mx-24 text-white">
                <div class="">
                  <h1
                    class="text-5xl md:text-6xl lg:text-[80px] font-bold leading-tight md:leading-snug lg:leading-normal tracking-wide md:tracking-normal lg:tracking-tight">
                    Let’s build from here

                  </h1>
                </div>
                <div class="font-semibold text-2xl  text-gray-100 mb-16">
                  The world’s leading AI-powered developer platform.
                </div>

                <div
                  class="text-white w-max tracking-wider border-white border-[3px] rounded-md px-5 py-3 text-xl font-bold cursor-pointer hover:text-gray-950 hover:bg-white hover:shadow-[0_0_15px_3px_rgba(255,255,255,0.6)] transition-all duration-300">
                  Start a free enterprise trial ⇨
                </div>

              </div>
            </div>
          </div>

          <div class="mt-[120px] w-full h-full flex justify-center items-center text-white">
            <div class=" text-center px-4 sm:px-16 md:px-32 lg:px-64 xl:px-[272px]">
              <div class="text-[28px] font-normal mb-4 leading-10">
                Even the all-powerful Pointing has no control about the blind texts.
              </div>
              <div class="leading-7 mb-[25px]">
                It is a paradisematic country, in which roasted parts of sentences fly into your mouth.<br />
                Even the all-powerful Pointing has no control about the blind texts it is an almost
                unorthographic life One day however a small line of blind text by the name of Lorem Ipsum
                decided to leave for the far World of Grammar.
              </div>
              <div class="">
                <a href="#"
                  class=" relative after:absolute after:-bottom-2 after:left-0 after:bg-purple-200 after:h-0.5 after:w-full hover:after:bg-purple-500 after:transition-all after:ease-in-out after:duration-300">
                  Read the full Story</a>
              </div>
            </div>
          </div>
          <div class="flex justify-center items-center my-[100px]">
            <div class="tuan-sub-line"></div>
            <div class="tuan-sub-label">
              Featured Mugs</div>
            <div class="tuan-sub-line"></div>
          </div>
          <div class="flex justify-center items-center my-[100px]">
            <div class="tuan-sub-line"></div>
            <div class="tuan-sub-label">
              More Product</div>
            <div class="tuan-sub-line"></div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Nav;