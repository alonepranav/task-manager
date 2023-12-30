"use client";

import React, { useState } from "react";
import image from "../../assets/login.jpeg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BACKEND_API } from "@/Constants";
import { toast } from "react-toastify";

export default function Page() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post( BACKEND_API+"/login", {
        ...formData,
      });

      if (res.data) {
        if (res.data.success) {
          localStorage.setItem(
            "login",
            JSON.stringify({
              token: res.data.data.token,
              email: res.data.data.email,
              user: res.data.data.user,
            })
          );

          toast("Login Successfull");
          router.push("/");
        } else {
          setLoading(false);
          toast(res.data.message);
        }
      }
    } catch (error) {
      setLoading(false);
      toast(error?.response?.data?.message);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="w-full sm:w-3/4 md:w-4/12 h-full py-20 px-3">
          <div className="flex justify-center items-center">
            <Image src={image} alt="afnlfnaslfnalsf" className="h-72 w-fit" />
          </div>
          <div className="w-full">
            <form className="w-full" onSubmit={handleSubmit}>
              <p className="text-center text-2xl py-4">Login </p>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email">Enter email </label>
                <input
                  type="email"
                  name=""
                  className="border border-slate-400 py-1.5 px-2 rounded-md"
                  id="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5 mt-4">
                <label htmlFor="password">Enter password </label>
                <input
                  type="password"
                  name=""
                  className="border border-slate-400 py-1.5 px-2 rounded-md"
                  id="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
              </div>

              <div className="my-8">
                <button
                  type={loading ? "button" : "submit"}
                  className={
                    (loading ? "bg-rose-300" : "bg-rose-500") +
                    ` w-full py-1.5 text-center text-white font-semibold tracking-wider rounded-md border border-slate-300`
                  }
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
