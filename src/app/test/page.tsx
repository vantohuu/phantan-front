"use client";
import React, { useState, useEffect } from "react";

import Stomp from "stompjs";
import SockJS from "sockjs-client";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [nickname, setNickname] = useState("");
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
    const client = Stomp.over(socket);
    console.log("tesst useEffect");

    client.connect({}, () => {
      client.subscribe("/topic/messages", (message: any) => {
        const receivedMessage = JSON.parse(message.body);
        console.log("message.body", receivedMessage);
        // console.log("message.body");

        // setMessages((prevMessages:any) => [...prevMessages, receivedMessage]);
      });
    });

    setStompClient(client);

    return () => {
      client.disconnect();
    };
  }, [message]);

  const handleNicknameChange = (event: any) => {
    setNickname(event.target.value);
  };

  const handleMessageChange = (event: any) => {
    setMessage(event.target.value);
  };

  const sendMessage = () => {
    if (message.trim()) {
      const chatMessage = {
        name: "message",
      };
      stompClient &&
        stompClient.send("/app/chat", {}, JSON.stringify(chatMessage));
      setMessage("");
    }
    console.log("Sended message");
  };

  sendMessage();

  return <></>;
};

export default App;
