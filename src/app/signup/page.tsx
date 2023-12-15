"use client";
import { Button, Checkbox, Form, Input } from "antd";
import React from "react";

import Header from "@/components/Header";
export default function Login() {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <div className="fixed w-screen h-screen">
        <Header></Header>
        <div className="w-full h-full bg-[url('/train-bg.jpg')] bg-cover bg-center flex justify-center items-center">
          <div className="opacity-80 drop-shadow-2xl flex flex-col justify-center items-center w-[400px] h-[400px] bg-pink-50 rounded-xl mb-[100px]">
            <p className="m-5 font-bold">Đăng kí</p>
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button className="bg-black" type="primary" htmlType="submit">
                  Đăng kí
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
