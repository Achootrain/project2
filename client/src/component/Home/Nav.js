import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="bg-red-200">
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
              <Link to="/Login" class="flex items-center">
                <span
                  class="mx-4 lg:mx-20 uppercase border-2 rounded-md w-max tracking-wider px-4 py-2 text-xl font-semibold
                                 hover:text-gray-950 hover:bg-white hover:shadow-[0_0_15px_3px_rgba(255,255,255,0.6)]"
                >
                  Sign In
                </span>
              </Link>
            </ul>
          </nav>
        </header>
      </div>
    </div>
  );
};

export default Nav;
