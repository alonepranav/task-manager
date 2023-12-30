"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import image from "../../assets/all-tasks.png";
import Task from "../../components/Task";
import axios from "axios";

import { BACKEND_API } from "@/Constants";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FaUserCheck } from "react-icons/fa6";

export default function Page() {
  const [task, setTask] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");

  const router = useRouter();

  const getTasks = async (user) => {
    try {
      const res = await axios.get(BACKEND_API + `/${user}`);

      if (res.data.success) {
        setTask([...res.data.tasks]);
      }
    } catch (err) {
      console.log(err);
      toast("Error");
    }
  };

  const checkTokenValid = async () => {
    try {
      const { user, email, token } = JSON.parse(localStorage.getItem("login"));

      if (!user || !email || !token) {
        router.push("/login");
        return;
      }

      const res = await axios.post(BACKEND_API + "/valid-token", {
        user,
        email,
        token,
      });

      if (res.data.success) {
        getTasks(user);
        setName(email);
        setLoading(false);
      } else {
        router.push("/login");
      }
    } catch (error) {
      toast("Invalid User");
      router.push("/login");
    }
  };

  useEffect(() => {
    let l = localStorage.getItem("login");

    if (l === null) {
      router.push("/login");
    } else {
      checkTokenValid();
    }
  }, []);

  const deleteTask = async (_id) => {
    try {
      const { user } = JSON.parse(localStorage.getItem("login"));

      if (!user) {
        router.push("/login");
        return;
      }

      const res = await axios.delete(BACKEND_API + `/${_id}`);

      if (res.data.success) {
        getTasks(user);
        toast("Task deleted ");
      } else {
      }
    } catch (error) {
      toast("Error");
    }
  };

  return (
    <>
      {loading ? (
        <div className="w-full mt-36 flex justify-center items-center gap-4">
          <div className="animate-spin inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500">
            <span className="sr-only">Loading...</span>
          </div>
          <p className="text-xl">Loading...</p>
        </div>
      ) : (
        <div className="h-full w-full flex justify-center items-center py-20">
          <div className="w-full md:w-1/2 px-7">
            <div className="flex justify-center items-center w-full mb-8">
              <Image
                src={image}
                alt="Add task Image"
                className="h-40 w-40 md:h-40"
              />
            </div>
            <div className="mb-5 flex justify-center items-center gap-3">
              <div className="flex gap-2">
                <p className="px-5 py-2 bg-rose-500 text-white font-semibold tracking-wide rounded-md flex justify-center items-center gap-3">
                  <FaUserCheck />
                  <span>{name}</span>
                </p>
                <button
                  className="px-5 py-2 bg-sky-500 text-white font-semibold tracking-wide rounded-md inline-block hover:bg-emerald-500"
                  onClick={() => {
                    localStorage.clear();
                    router.push("/");
                  }}
                >
                  Log Out
                </button>
              </div>
            </div>

            <div>
              <p className="font-semibold tracking-wide text-lg">
                All tasks :{" "}
              </p>
              <div className="mt-3">
                {task.length ? (
                  task.map((a, i) => {
                    return <Task key={i} {...{ ...a, deleteTask }} />;
                  })
                ) : (
                  <p className="text-xl font-semibold mt-5 text-center">
                    No Task present
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
