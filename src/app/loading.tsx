import { Spin } from "antd";
import React from "react";

export default function Loading() {
  return (
    <div className="fixed w-screen h-screen">
      <div className="w-full h-full bg-[url('/train-bg.jpg')] bg-cover bg-center flex justify-center items-center">
        <div className="bg-white opacity-80 drop-shadow-2xl flex flex-col justify-center items-center w-full h-full rounded-xl mb-[100px]">
          <Spin></Spin>
        </div>
      </div>
    </div>
  );
}
