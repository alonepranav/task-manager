"use client";

import { FaBars } from "react-icons/fa6";
import { AiOutlineClose } from "react-icons/ai";
import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {
  const links = [
    {
      title: "Home",
      route: "/",
    },
    {
      title: "Add Task",
      route: "/add-task",
    },
    {
      title: "Show Task",
      route: "/show-task",
    },
  ];

  const [hide, setHide] = useState(true);

  return (
    <>
      <>
        <div className="fixed w-full top-0 left-0">
          <div className="bg-rose-500 text-white flex justify-between items-center px-5 md:px-10 py-3.5 relative shadow-sm">
            <Link href={"/"} className="font-bold text-lg">
              Task Manager
            </Link>

            <div
              className={`flex items-center md:gap-10 gap-8 flex-col md:flex-row absolute md:static bg-white w-full md:w-fit top-[3.6rem] left-0 md:bg-inherit text-black md:text-white shadow-md md:shadow-none pb-0 md:pb-0 ${
                hide
                  ? "h-0 pt-0 md:h-fit overflow-hidden"
                  : "h-[300px] pt-2 md:h-fit pb-4"
              }`}
              style={{
                transition: "all .1s linear",
              }}
            >
              {links.map((a, i) => {
                return (
                  <Link
                    onClick={() => setHide(!hide)}
                    href={a.route}
                    key={i}
                    className="font-semibold"
                  >
                    {a.title}
                  </Link>
                );
              })}
              <Link
                href={"/login"}
                onClick={() => setHide(!hide)}
                className="border border-slate-200 px-5 py-1.5 hover:bg-cyan-300 hover:text-white"
              >
                Login
              </Link>
              <Link
                href={"/signin"}
                onClick={() => setHide(!hide)}
                className="border border-slate-200 px-5 py-1.5 hover:bg-emerald-400 hover:text-white"
              >
                Signin
              </Link>
            </div>

            <div className="md:hidden">
              {hide ? (
                <FaBars className="text-2xl" onClick={() => setHide(!hide)} />
              ) : (
                <AiOutlineClose
                  className="text-3xl"
                  onClick={() => setHide(!hide)}
                />
              )}
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default Navbar;
