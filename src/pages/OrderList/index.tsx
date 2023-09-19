import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import { usePaginate, useToggle } from "@tam11a/react-use-hooks";
import { useGetOrders } from "@/queries/order";
import { BsSearch } from "react-icons/bs";
import { FloatButton, Input } from "antd";
import Iconify from "@components/iconify";
import OrderColumn from "./components/OrderColumn";
import FilterDrawer from "./components/FilterDrawer";
import DatePicker from "@components/antd/DatePicker";
import moment from "moment";
const DataTable = React.lazy(() => import("@/components/Datatable"));

const OrderList: React.FC = () => {
  const {
    search,
    setSearch,
    getQueryParams,
    limit,
    setLimit,
    page,
    setPage,
    setFilterField,
    watch,
  } = usePaginate();
  const { data, isLoading } = useGetOrders({
    ...getQueryParams(),
    fromDate: watch("range")?.[0],
    toDate: watch("range")?.[1],
  });
  const { state: openFiler, toggleState: onCloseFilter } = useToggle(false);

  return (
    <>
      <Container
        maxWidth={"lg"}
        sx={{
          maxWidth: "1500px !important",
        }}
      >
        <Grid container rowGap={1} direction="column" marginTop={4}>
          <div className="flex flex-row items-center ">
            <Typography variant="subtitle1" fontWeight={700}>
              {/* {t("employee:EmployeeList")} */}
              Order
            </Typography>
          </div>
          <Grid className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <DatePicker.RangePicker
              bordered={true}
              size={"large"}
              allowClear
              allowEmpty={[false, false]}
              className="grid-cols-2"
              onChange={(v) => {
                if (
                  moment(v?.[0]).toISOString() === moment(v?.[1]).toISOString()
                ) {
                  setFilterField("range", [undefined, undefined]);
                } else {
                  setFilterField("range", [
                    moment(v?.[0]).toISOString(),
                    moment(v?.[1]).toISOString(),
                  ]);
                }
              }}
            />
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
            onClick={() => onCloseFilter()}
          />
        </FloatButton.Group>
      </Container>
      <FilterDrawer
        open={openFiler}
        onClose={onCloseFilter}
        setFilterField={setFilterField}
        watch={watch}
      />
    </>
  );
};

export default OrderList;
