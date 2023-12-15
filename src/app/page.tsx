"use client";
import ModelCancel from "@/components/ModelCancelOrder";
import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import Loading from "./loading";

// import Header from "@/components/Header";
type CTVeType = {
  idve?: number;
  username?: string;
  status?: number;
  create_at?: Date;
};

type VeType = {
  id?: number;
  username?: string;
  status?: number;
};
// let username = localStorage.getItem("username");

export default function Home() {
  const [data, setData] = useState([]);
  const [ve, setVe] = useState<VeType>({});
  const [ctVe, setCtVe] = useState<CTVeType>({});
  const [isLoading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [isOrdered, setIsOrdered] = useState(false);

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleOnClick = (event: any, item: any) => {
    // let item = event.target.data;

    setVe({ id: item.idve, username: item.username, status: 0 });
    setCtVe({
      username: item.username || "",
      idve: item.idve,
      status: item.status,
    });
    console.log("ve", ve);

    console.log("ctVe", ctVe);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setLoading(true);
    if (ctVe.status == 1) {
      fetch(`${process.env.API_DEV}/ve/update-ticket`, {
        method: "PUT",
        body: JSON.stringify(ve),
        headers: { "content-type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          // setData(data);
          setLoading(false);
        });
    } else {
      fetch(`${process.env.API_DEV}/ve/order-ticket`, {
        method: "PUT",
        body: JSON.stringify(ctVe),
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
        },
        // mode: "no-cors",
      })
        .then((res) => res.json())
        .then((data) => {
          // setData(data);
          setLoading(false);
        });
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetch(`${process.env.API_DEV}/ve/getall-order`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      });
  }, [isLoading]);

  // console.log(data);
  if (isLoading) return <Loading></Loading>;
  return (
    <>
      <div className="fixed w-screen h-screen">
        <Modal
          title={`Xác nhận vé số ${ve.id}`}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>
            {ctVe.status == 1
              ? "Bạn có muốn hủy vé không ?"
              : "Bạn có muốn đặt vé không?"}
          </p>
        </Modal>
        <div className="w-full h-full bg-[url('/train-bg.jpg')] bg-cover bg-center flex justify-center items-center">
          <div className=" drop-shadow-2xl flex flex-col justify-center items-center w-full h-full rounded-xl mb-[100px]">
            <div className="grid grid-cols-5 gap-20">
              {data.map((item: any) => {
                if (item)
                  return (
                    <div
                      className={`h-[80px] w-[200px] rounded flex flex-col justify-center items-center  ${
                        item.status == 0
                          ? " bg-green-200 hover:bg-green-400"
                          : " bg-rose-200 hover:bg-rose-400"
                      }`}
                      onClick={(e) => handleOnClick(e, item)}
                    >
                      <div> Vé số {item.idve}</div>
                      <div>
                        {" "}
                        {item.status == 1 ? item.username : "Chưa đặt"}
                      </div>
                      {/* <div> {item.status == 1 ? item.create_at : ""}</div> */}
                    </div>
                  );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
