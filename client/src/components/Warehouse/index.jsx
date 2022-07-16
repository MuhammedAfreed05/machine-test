import { Button, Table, Modal, Select, InputNumber, Form } from "antd";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery,  useMutation  } from "react-query";
import React from "react";
import { queryClient } from "../../main";

export default function WarehouseComponents() {
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

  const { id } = useParams();

  const fetchData = async ({queryKey}) => {
    const response = await axios.get(
      `http://localhost:5000/api/warehouses/${queryKey[1]}/products`
    );
    return response.data;
  };

  const getProduct = async () => {
    const response = await axios.get("http://localhost:5000/api/products");
    return response.data;
  };

  const { data: allProducts, isLoading } = useQuery("products", getProduct);

  const { data: products, status } = useQuery(
    ["fetechWarehouse", id],
    fetchData
  );

  const onFinish = async (values) => {
    const data = {
      ...values,
      warehouse_id: id,
    };

    await axios.post(
      "http://localhost:5000/api/products/warehouse/stock",
      data
    );
    return true;
  };

  const { mutate: createStock, isLoading: isCreatingStock } = useMutation(
    onFinish,
    {
      onSuccess: () => {
        queryClient.refetchQueries("fetechWarehouse", id);
        setIsModalVisible(false);
      },
    }
  );

  return (
    <div>
      <Button onClick={showModal} type="primary">
        Add Stock
      </Button>
      {status === "loading" && <div>Loading...</div>}
      {status === "error" && <div>Error</div>}
      {status === "success" && (
        <Table
          dataSource={products}
          columns={[
            {
              title: "Product id",
              dataIndex: "product_id",
              key: "product_id",
            },
            {
              title: "Product name",
                dataIndex: "product",
                key: "product",
                render: (text, record) => <div>{record.product.product_name}</div>,
            },
            {
                title: "Quantity",
                dataIndex: "quantity",
                key: "quantity",
            }
          ]}
        />
      )}
      <Modal
        title="Create product"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form onFinish={createStock} layout="vertical">
          <Form.Item label="Product" name="product_id" required>
            <Select placeholder="Select a product" loading={isLoading}>
              {allProducts &&
                allProducts.map((product) => (
                  <Select.Option
                    key={product.product_id}
                    value={product.product_id}
                  >
                    {product.product_name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item label="Quantity" name="quantity" required>
            <InputNumber
              min={1}
              style={{ width: "100%" }}
              placeholder="Enter quantity"
            />
          </Form.Item>
          <Form.Item>
            <Button
              //   loading={isCreatingProduct}
              loading={isCreatingStock}
              type="primary"
              htmlType="submit"
            >
              Add Stock
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
