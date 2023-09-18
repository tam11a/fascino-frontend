import React from "react";
import { Card, Statistic } from "antd";

const Sales: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-4 gap-2">
        <Card
          bordered={true}
          className="border-slate-400 text-slate-900 font-semibold"
        >
          <Statistic
            title="Total Sale (In Amount)"
            value={11.28}
            // precision={2}
            valueStyle={{ color: "" }}
            // prefix={<ArrowUpOutlined />}
            // suffix="%"
          />
        </Card>
        <Card
          bordered={true}
          className="border-slate-400 text-slate-900 font-semibold"
        >
          <Statistic
            title="total sale (In Quantity)"
            value={11.28}
            // precision={2}
            valueStyle={{ color: "" }}
            // prefix={<ArrowUpOutlined />}
            // suffix="%"
          />
        </Card>
        <Card
          bordered={true}
          className="border-slate-400 text-slate-900 font-semibold"
        >
          <Statistic
            title="Total Customer"
            value={11.28}
            // precision={2}
            valueStyle={{ color: "" }}
            // prefix={<ArrowUpOutlined />}
            // suffix="%"
          />
        </Card>{" "}
        <Card
          bordered={true}
          className="border-slate-400 text-slate-900 font-semibold"
        >
          <Statistic
            title="Total Delivery"
            value={11.28}
            // precision={2}
            valueStyle={{ color: "" }}
            // prefix={<ArrowUpOutlined />}
            // suffix="%"
          />
        </Card>
        <Card
          bordered={true}
          className="border-slate-400 text-slate-900 font-semibold"
        >
          <Statistic
            title="Total Due"
            value={11.28}
            // precision={2}
            valueStyle={{ color: "" }}
            // prefix={<ArrowUpOutlined />}
            // suffix="%"
          />
        </Card>
        <Card
          bordered={true}
          className="border-slate-400 text-slate-900 font-semibold"
        >
          <Statistic
            title="Top Salesman"
            value={11.28}
            // precision={2}
            valueStyle={{ color: "" }}
            // prefix={<ArrowUpOutlined />}
            // suffix="%"
          />
        </Card>
      </div>
    </>
  );
};

export default Sales;
