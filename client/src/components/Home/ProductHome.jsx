import { Button, Modal, Form, Input, Table } from "antd";
import React from "react";
import axios from "axios";
import { useQuery, useMutation } from "react-query";
import { queryClient } from "../../main";

export default function ProductHome() {
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

  const getProduct = async () => {
    const response = await axios.get("http://localhost:5000/api/products");
    return response.data;
  };

  const { data: products, status } = useQuery("products", getProduct);

  const onFinish = async (values) => {
    await axios.post("http://localhost:5000/api/products", values);
  };

  const { mutate: createProduct, isLoading: isCreatingProduct } = useMutation(
    onFinish,
    {
      onSuccess: () => {
        queryClient.refetchQueries("products");
        setIsModalVisible(false);
      },
    }
  );

  return (
    <div>
      <Button onClick={showModal} type="primary">
        Add product
      </Button>

      <Modal
        title="Create product"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form onFinish={createProduct} layout="vertical">
          <Form.Item label="Product name." name="product_name" required>
            <Input placeholder="Enter product name" />
          </Form.Item>
          <Form.Item>
            <Button
              loading={isCreatingProduct}
              type="primary"
              htmlType="submit"
            >
              Create Product
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {status === "loading" && <div>Loading...</div>}
      {status === "error" && <div>Error!</div>}
      {status === "success" && (
        <Table
          pagination={false}
          dataSource={products}
          columns={[
            {
              title: "Product id",
              dataIndex: "product_id",
              key: "product_id",
            },
            {
              title: "Product name",
              dataIndex: "product_name",
              key: "product_name",
            },
          ]}
        />
      )}
    </div>
  );
}
