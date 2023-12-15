import Link from "next/link";
import React, { useState } from "react";

export default function Header() {
  const [isLogin, setIsLogin] = useState(true);

  const setLogin = () => {
    setIsLogin(true);
  };

  const setSignUp = () => {
    setIsLogin(false);
  };

  console.log(isLogin);

  return (
    <>
      <div className="w-full bg-white h-[60px] flex items-center justify-end drop-shadow-2xl border-gray-100 border-b-2">
        <div className="p-5 flex-1 font-bold italic ">Hệ thống đặt vé tàu</div>
        <div className="flex flex-none">
          <div
            className={`${
              isLogin ? "bg-pink-200" : "bg-pink-100"
            } mx-3 me-5 p-2  rounded  hover:bg-pink-200 hover:scale-x-110`}
          >
            <Link onClick={setLogin} className="mx-10" href="/login">
              Đăng nhập
            </Link>
          </div>
          <div
            className={`${
              !isLogin ? "bg-pink-200" : "bg-pink-100"
            } mx-3 me-10 p-2  rounded hover:bg-pink-200 hover:scale-x-110`}
          >
            <Link onClick={setSignUp} className="mx-10" href="/signup">
              Đăng kí
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
