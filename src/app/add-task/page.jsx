"use client";

import React, { useEffect, useState } from "react";
import image from "../../assets/add-task.png";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { BACKEND_API } from "@/Constants";

export default function Page() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);

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
        setLoad(false);
      } else {
        router.push("/login");
      }
    } catch (error) {
      toast("Invalid User");
      router.push("/login");
    }
  };

  useEffect(() => {
    try {
      const l = localStorage.getItem("login");

      if (l === null) {
        router.push("/login");
      } else {
        checkTokenValid();
      }
    } catch (error) {
      toast("Err");
    }
  }, []);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    let l = localStorage.getItem("login");

    setLoading(true);

    if (l !== null) {
      try {
        l = JSON.parse(l);

        if (l?.user) {
          const res = await axios.post(BACKEND_API + "/add-task", {
            ...formData,
            user: l?.user,
          });

          toast("🦄 Task added succesfully");
          setFormData({
            title: "",
            description: "",
            status: "pending",
          });
          setLoading(false);
        }
      } catch (error) {
        toast("🌋 Error in adding task");
      }
    } else {
      router.push("/login");
    }
  };

  return (
    <>
      {load ? (
        <div className="w-full mt-36 flex justify-center items-center gap-4">
          <div className="animate-spin inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500">
            <span className="sr-only">Loading...</span>
          </div>
          <p className="text-xl">Loading...</p>
        </div>
      ) : (
        <div className="w-full h-full px-3 flex justify-center items-center py-20">
          <div className="w-full sm:w-3/4 md:w-6/12 h-full">
            <div className="flex justify-center items-center">
              <Image
                src={image}
                alt="Add task Image"
                className="h-72 md:h-96 w-fit"
              />
            </div>

            <form
              onSubmit={handleSubmit}
              className="w-full flex justify-center items-center flex-col"
            >
              <div className="flex flex-col mb-5 w-full">
                <label htmlFor="title">Task Title</label>
                <input
                  type="text"
                  className="border px-3 py-1.5 mt-1 rounded-md"
                  id="title"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>

              <div className="flex flex-col mb-5 w-full">
                <label htmlFor="title">Task Description</label>
                <input
                  type="text"
                  className="border px-3 py-1.5 mt-1 rounded-md"
                  id="title"
                  required
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>

              <div className="flex flex-col mb-5 w-full">
                <label htmlFor="title">Task Status</label>
                <select
                  defaultValue={"pending"}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className="px-2 py-2 w-full mt-1.5 border border-slate-600"
                  required
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div className="my-5 w-full">
                <button
                  type={loading ? "button" : "submit"}
                  className={
                    (loading ? "bg-rose-300" : "bg-rose-500") +
                    ` w-full py-1.5 text-center text-white font-semibold tracking-wider rounded-md border border-slate-300`
                  }
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
