"use client";
import { Button, Form, Input } from "antd";
import Image from "next/image";
import React, { FormEvent, useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import Header from "@/components/Header";
import TextArea from "antd/es/input/TextArea";
import Link from "next/link";
export default function Account() {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  type FieldType = {
    username?: string;
    ten?: string;
    ho?: string;
    diachi?: string;
    avatar?: string;
  };

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>();
  const [status, setStatus] = useState<String>("failed");
  const [user, setUser] = useState<FieldType>();
  const router = useRouter();
  const [form] = Form.useForm();
  const userName = Form.useWatch("username", form);
  const ten = Form.useWatch("ten", form);
  const ho = Form.useWatch("ho", form);
  const diachi = Form.useWatch("diachi", form);

  useEffect(() => {
    const getUser = async () => {
      const username = localStorage.getItem("username");
      if (!username) {
        window.location.href = "/login";
      }
      await fetch(`${process.env.API_DEV}/user/${username}`)
        .then((res) => res.json())
        .then((data) => {
          const userResponse: FieldType = data.data;
          console.log("userResponse", userResponse);
          setUser(userResponse);
        });
    };
    getUser();
  }, [isLoading]);

  useEffect(() => {
    form.setFieldsValue(user);
  }, [user]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.API_DEV}/user/${userName}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userName,
          ten: ten,
          ho: ho,
          diachi: diachi,
        }),
      });

      const data = await response.json();
      console.log("response.data:", data);
      setStatus(data.status);
      if (data.status == "success") {
        setIsSuccess(true);
      } else {
        setIsSuccess(false);
      }
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
        <Header isHomePage={true}></Header>
        <div className="w-full h-full bg-[url('/train-bg.jpg')] bg-cover bg-center flex justify-center items-center">
          <div className="p-10 opacity-80 drop-shadow-2xl flex flex-col justify-center items-center w-[500px] bg-pink-50 rounded-xl mb-[100px]">
            <div>
              <div className="w-[120px] h-[120px] bg-slate-200 rounded-full flex flex-col justify-center items-center">
                <Image
                  className="rounded-full"
                  alt=""
                  height={120}
                  width={120}
                  src={"/train.png"}
                ></Image>
              </div>
            </div>
            <p className="m-5 font-bold">Tài khoản</p>
            <Form
              name="login"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              form={form}
              onSubmitCapture={onSubmit}
            >
              <Form.Item<FieldType>
                label="Username"
                name="username"
                initialValue={user?.username}
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input readOnly />
              </Form.Item>
              <Form.Item<FieldType>
                label="Họ"
                name="ho"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
                shouldUpdate
              >
                <Input value={user?.ho} />
              </Form.Item>
              <Form.Item<FieldType>
                label="Tên"
                name="ten"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item<FieldType>
                label="Địa chỉ"
                name="diachi"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <TextArea></TextArea>
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button
                  loading={isLoading}
                  className="bg-black"
                  type="primary"
                  htmlType="submit"
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
            <p
              className={
                isSuccess == false
                  ? "text-rose-600 mb-5 "
                  : "text-green-500 mb-5"
              }
            >
              {isSuccess == false
                ? ""
                : isSuccess == true
                ? "Thay đổi thành công"
                : ""}
            </p>
            <Link
              href="/change-password"
              className="italic underline hover:decoration-sky-500 hover:text-sky-500 decoration-2	underline-offset-8"
            >
              Đổi mật khẩu
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
