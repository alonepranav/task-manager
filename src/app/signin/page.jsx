"use client";

import React, { useContext, useState } from "react";
import image from "../../assets/signin.jpeg";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { BACKEND_API } from "@/Constants";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(BACKEND_API + "/signin", {
        ...formData,
      });

      if (res.data) {
        if (res.data.success) {
          // setLoading(false);
          toast("Signin successfull");
          router.push("/login");
        } else {
          setLoading(false);
          toast(res.data.message);
        }
      }
    } catch (error) {
      setLoading(false);
      toast(error.message);
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
              <p className="text-center text-2xl py-4">Signin</p>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email">Enter email </label>
                <input
                  type="email"
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
                  className="border border-slate-400 py-1.5 px-2 rounded-md"
                  id="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <p className="text-rose-500 font-semibold text-center mt-4 text-lg">
                  {err}
                </p>
              </div>

              <div className="mb-8 mt-6">
                <button
                  type={loading ? "button" : "submit"}
                  className={
                    (loading ? "bg-rose-300" : "bg-rose-500") +
                    ` w-full py-1.5 text-center text-white font-semibold tracking-wider rounded-md border border-slate-300`
                  }
                >
                  Signin
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
