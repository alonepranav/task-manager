import Image from "next/image";
import React, { useContext } from "react";
import image from "../assets/task-manager.png";
import Link from "next/link";

export default function page() {

  return (
    <>
      <div className="mt-20 md:mt-36 flex justify-center flex-col md:flex-row items-center px-3 md:px-32 lg:px-48 gap-10">
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <Image src={image} className="h-fit w-fit" alt="Task Manager vector Image" />
        </div>
        <div className="w-full md:w-1/2">
          <p className="text-3xl font-medium mb-3">Task Manager</p>
          {/* <p>This is a simple task manager app</p> */}
          <p className="mb-2">
            Welcome to{" "}
            <span className="text-rose-500 font-semibold">
              [ Task Manager Web App ] !
            </span>{" "}
            Stay organized and boost productivity with our easy-to-use task
            manager.
          </p>
          <p className="mb-2">
            Log in to add, edit, and track your tasks effortlessly. Prioritize
            your to-dos, set
          </p>
          <p className="mb-2">
            due dates, and never miss a deadline. Simplify your life, one task
            at a time.
          </p>
          <div className="flex gap-6">
            <Link href={"/login"}>
              <button className="border border-slate-300 bg-slate-200 px-4 py-1 rounded-md shadow-md">
                Login
              </button>
            </Link>
            <Link href={"/signin"}>
              <button className="border border-slate-300 bg-slate-200 px-4 py-1 rounded-md shadow-md">
                Signin
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
