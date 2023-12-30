import React from "react";
import {
  AiFillGithub,
  AiFillInstagram,
  AiOutlineTwitter,
} from "react-icons/ai";

export default function Footer() {
  return (
    <>
      <div className="flex justify-center md:justify-between items-center flex-wrap flex-col md:flex-row gap-3 md:px-20 py-3 mt-10 bg-rose-500 text-white font-semibold">
        <div className="">&copy; SC : All rights Reserved</div>
        <div className="flex gap-3 text-2xl">
          <a target="_blank" href="https://instagram.com/pranavshilavane">
            <AiFillInstagram />
          </a>

          <a target="_blank" href="https://twitter.com/pranavshilavane">
            <AiOutlineTwitter />
          </a>

          <a target="_blank" href="https://github.com/pranavshilavane">
            <AiFillGithub />
          </a>
        </div>
      </div>
    </>
  );
}
