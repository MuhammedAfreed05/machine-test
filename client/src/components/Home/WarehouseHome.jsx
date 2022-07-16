import { Button, Modal, Form, Input, Table } from "antd";
import React from "react";
import axios from "axios";
import { useQuery, useMutation } from "react-query";
import { queryClient } from "../../main";
import {Link} from "react-router-dom";

export default function WarehouseHome() {
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const getWarehouse = async () => {
    const response = await axios.get("http://localhost:5000/api/warehouses");
    return response.data;
  };

  const { data: warehouse, status } = useQuery("warehouse", getWarehouse);

  const onFinish = async (values) => {
    await axios.post("http://localhost:5000/api/warehouses", values);
  };

  const { mutate: createWarehouse, isLoading: isCreatingWarehouse } =
    useMutation(onFinish, {
      onSuccess: () => {
        queryClient.refetchQueries("warehouse");
        setIsModalVisible(false);
      },
    });

  return (
    <div>
      <Button onClick={showModal} type="primary">
        Add Warehouse
      </Button>

      <Modal
        title="Create Warehouse"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form onFinish={createWarehouse} layout="vertical">
          <Form.Item label="Warehouse no." name="warehouse_number" required>
            <Input placeholder="Enter Warehouse no" />
          </Form.Item>
          <Form.Item>
            <Button
              loading={isCreatingWarehouse}
              type="primary"
              htmlType="submit"
            >
              Create Warehouse
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {status === "loading" && <div>Loading...</div>}
      {status === "error" && <div>Error!</div>}
      {status === "success" && (
        <Table
          pagination={false}
          dataSource={warehouse}
          columns={[
            {
              title: "Warehouse no.",
              dataIndex: "warehouse_no",
              key: "warehouse_no",
              render: (text, record) => (<Link to={`/warehouse/${record.warehouse_id}`}>{text}</Link>),
            },
          ]}
        />
      )}
    </div>
  );
}
