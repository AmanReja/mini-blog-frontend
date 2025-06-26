import React from "react";
import Link from "next/link";
import admin from "../../../public/images/admin.jpg";
import Image from "next/image";
const Navbar = () => {
  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-md border  border-gray-100 bg-white/80 py-3 shadow backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg">
        <div className="px-4">
          <div className="flex items-center justify-between">
            <div className="flex shrink-0">
              <a aria-current="page" className="flex items-center" href="/">
                <h1 className="text-black">Myblog</h1>
              </a>
            </div>

            <div className=" text-black">
              <Image
                className="w-[40px] h-[40px] object-cover rounded-full"
                src={admin}
                alt="image"
              ></Image>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
