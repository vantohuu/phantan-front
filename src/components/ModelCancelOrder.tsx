import React, { useState } from "react";
import { Button, Modal } from "antd";

type CTVeType = {
  idve?: BigInteger;
  username?: string;
  status?: BigInteger;
  create_at?: Date;
};
const ModelCancel = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default ModelCancel;
