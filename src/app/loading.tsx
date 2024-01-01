import { Spin } from "antd";
import React from "react";

export default function Loading() {
  return (
    <div className="fixed w-screen h-screen">
      <div className="bg-[url('/train-bg.jpg')] bg-cover bg-center flex justify-center items-center">
        <div className="w-screen h-screen bg-white opacity-60 drop-shadow-2xl flex flex-col justify-center items-center">
          <Spin size="large"></Spin>
        </div>
      </div>
    </div>
  );
}
