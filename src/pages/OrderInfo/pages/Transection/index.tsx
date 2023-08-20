import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import { useGetOrderById } from "@/queries/order";
// import { BsSearch } from "react-icons/bs";
import { FloatButton } from "antd";
import Iconify from "@components/iconify";
import TransectionColumn from "./components/TransectionColumn";
import { useParams } from "react-router-dom";
import { useToggle } from "@tam11a/react-use-hooks";
import AddTransaction from "./components/AddOrder";
import { Card, Col, Row, Statistic } from "antd";
const DataTable = React.lazy(() => import("@/components/Datatable"));

const Transection: React.FC = () => {
  const { oid } = useParams();
  const { data, isLoading } = useGetOrderById(oid);

  // console.log(data?.data?.data?.transaction);
  const { state: open, toggleState: onClose } = useToggle(false);

  let totalAmount = 0;

  data?.data?.data?.transaction.forEach((total: any) => {
    totalAmount += total.amount;
  });
  const due = data?.data?.data?.total - totalAmount;

  return (
    <>
      <Container
        maxWidth={"lg"}
        sx={{
          maxWidth: "1500px !important",
        }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Card bordered={false}>
              <Statistic
                title="Total Amount"
                value={data?.data?.data?.total}
                precision={2}
                valueStyle={{ color: "#3f8600" }}
                // prefix={<ArrowUpOutlined />}
                // suffix="%"
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card bordered={false}>
              <Statistic
                title="Due Amount"
                value={due}
                precision={2}
                valueStyle={{ color: "#cf1322" }}
                // prefix={<ArrowDownOutlined />}
                // suffix="%"
              />
            </Card>
          </Col>
        </Row>
        <Grid container rowGap={1} direction="column" marginTop={4}>
          <Grid className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex flex-row items-center ">
              <Typography
                variant="subtitle1"
                fontWeight={700}
                className="whitespace-nowrap"
              >
                {/* {t("employee:EmployeeList")} */}
                Transaction History
              </Typography>
            </div>
            {/* <Input
              className="w-full sm:max-w-xs"
              placeholder="Search Order By Invoice Id"
              suffix={<BsSearch />}
              style={{ width: "auto" }}
              size="large"
              allowClear
            /> */}
          </Grid>
          <Grid item>
            <DataTable
              columns={TransectionColumn()}
              rows={data?.data?.data?.transaction || []}
              isLoading={isLoading}
              paginationMode={"server"}
              getRowId={(r: any) => r?._id || r.id}
              rowCount={data?.data?.total || 0}
            />
          </Grid>
        </Grid>
        {due > 0 && (
          <FloatButton.Group shape="square" className="bottom-20 sm:bottom-4">
            <FloatButton
              icon={<Iconify icon={"material-symbols:add"} />}
              onClick={() => onClose()}
            />
          </FloatButton.Group>
        )}
        <AddTransaction open={open} onClose={onClose} />
      </Container>
    </>
  );
};

export default Transection;

// "transactions": [{ "paid": 100, "method": "COD" }]
