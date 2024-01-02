"use client";
import { Modal } from "antd";
import React, { useEffect, useState, useCallback } from "react";
import Loading from "./loading";
import Header from "@/components/Header";
import { Button, notification, Space } from "antd";
import Stomp from "stompjs";
import SockJS from "sockjs-client";

type NotificationType = "success" | "info" | "warning" | "error";

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

export default function Home() {
  const [data, setData] = useState([]);
  const [ve, setVe] = useState<VeType>({});
  const [ctVe, setCtVe] = useState<CTVeType>({});
  const [isLoading, setLoading] = useState(false);
  const [update, setUpdate] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState<string>(
    localStorage.getItem("username") || ""
  );
  const socketUrl = `${process.env.API_WS}/gs-guide-websocket`;

  const [messageHistory, setMessageHistory] = useState([]);

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [nickname, setNickname] = useState("");
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
    const client = Stomp.over(socket);

    client.connect({}, () => {
      client.subscribe("/topic/messages", (message: any) => {
        const receivedMessage = JSON.parse(message.body);
        // console.log("message.body", receivedMessage);
        setUpdate(receivedMessage);

        // console.log("message.body");

        // setMessages((prevMessages:any) => [...prevMessages, receivedMessage]);
      });
    });

    setStompClient(client);

    // return () => {
    //   client.disconnect();
    // };
  }, []);

  const sendMessage = () => {
    // if (message.trim()) {
    const chatMessage = {
      name: "message",
    };
    stompClient &&
      stompClient.send("/app/chat", {}, JSON.stringify(chatMessage));

    // setMessage("");
    // }
    // console.log("Sended message");
  };

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type: NotificationType) => {
    api[type]({
      message: "Thông báo",
      description: "Cập nhật thành công",
    });
  };
  if (!username) {
    window.location.href = "/login";
  }
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleOnClick = (event: any, item: any) => {
    setUsername(localStorage.getItem("username") || "");
    if (!username) window.location.href = "/login";
    console.log(username, item.username);
    if (item.username == username || item.status == 0) {
      setVe({ id: item.idve, username: username || "", status: 0 });
      setCtVe({
        username: username || "",
        idve: item.idve,
        status: item.status,
      });
      // console.log("ve", ve);
      // console.log("ctVe", ctVe);
      setIsModalOpen(true);
    }
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
          setLoading(false);
          sendMessage();
          // setStatus(data.status);
        });
    } else {
      fetch(`${process.env.API_DEV}/ve/order-ticket`, {
        method: "PUT",
        body: JSON.stringify(ctVe),
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "DELETE, POST, GET, PUT, OPTIONS",
          "Sec-Fetch-Site": "none",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("test", data);
          sendMessage();
          setLoading(false);
          // openNotificationWithIcon("success");
          // console.log("notification");
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
      });
    // openNotificationWithIcon("success");
  }, [isLoading, update]);

  if (isLoading) return <Loading></Loading>;
  return (
    <>
      {/* <audio src="xo-so-mien-bac.mp3" autoPlay loop></audio> */}
      <div className="fixed w-screen h-screen  bg-[url('/train-bg.jpg')] bg-cover bg-center ">
        <Modal
          title={`Xác nhận vé số ${ve.id}`}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okButtonProps={{ className: "bg-black" }}
        >
          <p>
            {ctVe.status == 1
              ? "Bạn có muốn hủy vé không ?"
              : "Bạn có muốn đặt vé không?"}
          </p>
        </Modal>
        <div className="w-full h-full flex-col justify-center items-center">
          <Header isHomePage={true}></Header>
          {contextHolder}
          <div className=" drop-shadow-2xl flex flex-col justify-center items-center w-full h-full rounded-xl ">
            <div className="grid grid-cols-5 gap-20 mb-[100px]">
              {data.map((item: any) => {
                if (item)
                  return (
                    <div
                      className={`h-[80px] w-[200px] rounded flex flex-col justify-center items-center  ${
                        item.status == 0
                          ? "bg-rose-200 hover:bg-rose-400"
                          : item.username == username
                          ? "bg-green-200 hover:bg-green-400"
                          : "bg-slate-200 hover:bg-slate-400"
                      }`}
                      onClick={(e) => handleOnClick(e, item)}
                    >
                      <div className="font-bold"> Vé số {item.idve}</div>
                      <div>
                        {" "}
                        {item.status == 1
                          ? "Vé đã đặt bởi: " + item.username
                          : "Chưa đặt"}
                      </div>
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
