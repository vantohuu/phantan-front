"use client";
import { Button, Checkbox, Form, Input } from "antd";
import Image from "next/image";
import React, { FormEvent, useEffect, useState } from "react";
import Router from "next/router";

import { redirect, useRouter } from "next/navigation";
import Header from "@/components/Header";
export default function Account() {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  type FieldType = {
    username?: string;
    password?: string;
  };
  const [isLoading, setIsLoading] = useState<boolean>();
  const [isSuccess, setIsSuccess] = useState<boolean>();
  const [status, setStatus] = useState<String>("failed");
  const router = useRouter();

  const [form] = Form.useForm();

  const userName = Form.useWatch("username", form);
  const passWord = Form.useWatch("password", form);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.API_DEV}/user/insert`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userName,
          password: passWord,
        }),
      });

      const data = await response.json();
      console.log("response.data:", data);
      setStatus(data.status);
      if (data.status == "success") {
        setIsSuccess(true);
        router.push("/");
      } else {
        setIsSuccess(false);
      }
      console.log(isSuccess);
      localStorage.setItem("username", userName);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); // Set loading to false when the request completes
    }
  }

  return (
    <>
      <div className="fixed w-screen h-screen">
        <Header></Header>
        <div className="w-full h-full bg-[url('/train-bg.jpg')] bg-cover bg-center flex justify-center items-center">
          <div className="opacity-80 drop-shadow-2xl flex flex-col justify-center items-center w-[400px] h-[400px] bg-pink-50 rounded-xl mb-[100px]">
            <p className="m-5 font-bold">Đăng kí</p>
            <Form
              name="login"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              form={form}
              onSubmitCapture={onSubmit}
            >
              <Form.Item<FieldType>
                label="Username"
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item<FieldType>
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button
                  loading={isLoading}
                  className="bg-black/80"
                  type="primary"
                  htmlType="submit"
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
            <p
              className={
                isSuccess ? "text-green-500 mb-5" : "text-rose-600 mb-5"
              }
            >
              {isSuccess == false ? "User is exists" : ""}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
