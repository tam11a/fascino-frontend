import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import { usePaginate, useToggle } from "@tam11a/react-use-hooks";
// import CreateOrder from "./components/CreateOrder";
import { useGetOrders } from "@/queries/order";
import BackButton from "@components/BackButton";
import { BsSearch } from "react-icons/bs";
import { FloatButton, Input } from "antd";
import Iconify from "@components/iconify";
import OrderColumn from "./components/OrderColumn";
const DataTable = React.lazy(() => import("@/components/Datatable"));

const OrderList: React.FC = () => {
  const { search, setSearch, getQueryParams, limit, setLimit, page, setPage } =
    usePaginate();
  const { data, isLoading } = useGetOrders(getQueryParams());

  return (
    <>
      <Container
        maxWidth={"lg"}
        sx={{
          maxWidth: "1500px !important",
        }}
      >
        <Grid container rowGap={1} direction="column" marginTop={4}>
          <Grid className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex flex-row items-center ">
              <BackButton />
              <Typography variant="subtitle1" fontWeight={700}>
                {/* {t("employee:EmployeeList")} */}
                Order
              </Typography>
            </div>
            <Input
              className="w-full sm:max-w-xs"
              placeholder="Search Order By Invoice Id"
              suffix={<BsSearch />}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: "auto" }}
              size="large"
              allowClear
            />
          </Grid>
          <Grid item>
            <DataTable
              columns={OrderColumn()}
              rows={data?.data?.data || []}
              isLoading={isLoading}
              paginationMode={"server"}
              getRowId={(r: any) => r?._id || r.id}
              rowCount={data?.data?.total || 0}
              page={page}
              onPageChange={setPage}
              pageSize={limit}
              onPageSizeChange={setLimit}
            />
          </Grid>
        </Grid>

        <FloatButton.Group shape="square" className="bottom-20 sm:bottom-4">
          <FloatButton
            icon={<Iconify icon={"material-symbols:filter-alt-outline"} />}
          />
        </FloatButton.Group>
      </Container>
    </>
  );
};

export default OrderList;
