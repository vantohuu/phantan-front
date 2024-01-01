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
    oldPassword?: string;
    newPassword?: string;
  };

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>();
  const [status, setStatus] = useState<String>("failed");
  const [user, setUser] = useState<FieldType>();
  const router = useRouter();
  const [form] = Form.useForm();
  const userName = Form.useWatch("username", form);
  const oldPassword = Form.useWatch("oldPassword", form);
  const newPassword = Form.useWatch("newPassword", form);

  // useEffect(() => {
  //   const getUser = async () => {
  //
  //     await fetch(`${process.env.API_DEV}/user/${username}`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         const userResponse: FieldType = data.data;
  //         console.log("userResponse", userResponse);
  //         setUser(userResponse);
  //       });
  //   };
  //   getUser();
  // }, [isLoading]);

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (!username) {
      window.location.href = "/login";
    }
    form.setFieldValue("username", username);
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.API_DEV}/user/change-password`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: userName,
            oldPassword: oldPassword,
            newPassword: newPassword,
          }),
        }
      );

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
                  src={"/a.png"}
                ></Image>
              </div>
            </div>
            <p className="m-5 font-bold">Đổi mật khẩu</p>
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
                label="Mật khẩu cũ"
                name="oldPassword"
                rules={[
                  {
                    required: true,
                    message: "Please input your old password!",
                  },
                ]}
                shouldUpdate
              >
                <Input />
              </Form.Item>
              <Form.Item<FieldType>
                label="Mật khẩu mới"
                name="newPassword"
                rules={[
                  {
                    required: true,
                    message: "Please input your new password!",
                  },
                ]}
              >
                <Input />
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
                ? "Sai mật khẩu cũ"
                : isSuccess == true
                ? "Thay đổi thành công"
                : ""}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
