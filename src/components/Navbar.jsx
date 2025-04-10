"use client";

import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-transparent">
      <div className="max-w-auto mx-auto px-4">
        <div className="flex justify-between items-center py-2">
          <div className="flex items-center">
            <Link href="/" className="font-bold text-md text-gray-800 mr-2">
              SKINSTRIC
            </Link>

            <Link href="/introduction" className="group flex items-center">
              <svg
                width="5"
                height="19"
                viewBox="0 0 5 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-500 w-5 h-5 transition-all duration-300 group-hover:text-black group-hover:translate-x-1"
              >
                <path
                  d="M5 18H3C1.89543 18 1 17.1046 1 16V3C1 1.89543 1.89543 1 3 1H5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
              <h1 className="text-gray-500 text-md font-bold mx-1 transition-colors duration-300 group-hover:text-black">
                INTRO
              </h1>
              <svg
                width="5"
                height="19"
                viewBox="0 0 5 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-500 w-5 h-5 transition-all duration-300 group-hover:text-black group-hover:-translate-x-1"
              >
                <path
                  d="M0 18H2C3.10457 18 4 17.1046 4 16V3C4 1.89543 3.10457 1 2 1H0"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </Link>
          </div>
          <div className="flex items-center gap-4"> 
            <Link href="/login" className="block">
              <button className="relative overflow-hidden group bg-black px-4 py-2 transition-all duration-300">
                <span className="text-white text-sm font-bold transition-transform duration-300 group-hover:-translate-y-full block">
                  LOG IN
                </span>
                <span className="text-black text-sm font-bold absolute inset-0 flex items-center justify-center bg-white translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                  LOG IN
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
