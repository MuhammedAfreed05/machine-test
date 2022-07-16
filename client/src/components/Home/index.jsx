import { Tabs } from "antd";
import React from "react";
import ProductHome from "./ProductHome";
import WarehouseHome from "./WarehouseHome";

const { TabPane } = Tabs;

export default function HomeComponent() {
  return (
    <div className="card-container">
      <Tabs type="card">
        <TabPane tab="Warehouse" key="1">
          <WarehouseHome />
        </TabPane>
        <TabPane tab="Products" key="2">
          <ProductHome />
        </TabPane>
      </Tabs>
    </div>
  );
}
