"use client";

import { BACKEND_API } from "@/Constants";
import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const loginContext = createContext(null);

export default function LoginContext({ children }) {
  const [user, setUser] = useState(null);

  const checkTokenValid = async () => {
    console.log("Check");
    try {
      const { user, email, token } = JSON.parse(localstorage);

      const res = await axios.post(
        "http://localhost:3000/api/valid-token",
        JSON.parse(localstorage)
      );

      if (res.data.success) {
        console.log(res);
        setUser({
          email,
          user,
        });
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    }
  };

  useEffect(() => {
    const localstorage = localStorage.getItem("login");

    if (localstorage === null) {
      // setUser(null);
    } else {
      // console.log(localstorage);
      // checkTokenValid();
    }
  }, []);

  const setdata = (email, user) => {
    console.log("Set data");
    return;

    setUser({
      email,
      user,
    });
  };

  return (
    <loginContext.Provider value={{ user, checkTokenValid, setdata }}>
      {children}
    </loginContext.Provider>
  );
}
