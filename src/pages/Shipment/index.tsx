import { useGetShipment } from "@/queries/shipment";
import DataTable from "@components/Datatable";
import Iconify from "@components/iconify";
import { Container, Grid, Typography } from "@mui/material";
import { usePaginate, useToggle } from "@tam11a/react-use-hooks";
import { FloatButton, Input } from "antd";
import React from "react";
import { BsSearch } from "react-icons/bs";
import CreateShipment from "./components/CreateShipment";
import ShipmentColumn from "./components/ShipmentColumn";

const Shipments: React.FC = () => {
  const { limit, setLimit, page, setPage, getQueryParams, setSearch, search } =
    usePaginate();

  const { data, isLoading } = useGetShipment(getQueryParams());
  console.log(data);

  const { state: open, toggleState: onClose } = useToggle(false);

  return (
    <>
      <Container
        maxWidth={"lg"}
        sx={{
          maxWidth: "1500px !important",
        }}
      >
        <Grid container rowGap={2} direction="column" marginTop={4}>
          <Grid className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex flex-row items-center ">
              <Typography variant="subtitle1" fontWeight={700}>
                {/* {t("employee:EmployeeList")} */}
                Shipment
              </Typography>
            </div>
            <Input
              className="w-full sm:max-w-xs"
              placeholder="Search Shipment"
              suffix={<BsSearch />}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: "auto" }}
              size="large"
            />
          </Grid>

          <Grid item>
            <DataTable
              columns={ShipmentColumn()}
              rows={data?.data?.data || []}
              isLoading={isLoading}
              getRowId={(r: any) => r?._id}
              // ss pagination
              rowCount={data?.data?.total || 0}
              paginationMode={"server"}
              page={page}
              onPageChange={setPage}
              pageSize={limit}
              onPageSizeChange={setLimit}
            />
          </Grid>
        </Grid>

        <FloatButton.Group shape="square" className="bottom-20 sm:bottom-4">
          <FloatButton
            icon={<Iconify icon={"material-symbols:add"} />}
            onClick={() => onClose()}
          />
          <FloatButton
            icon={<Iconify icon={"material-symbols:filter-alt-outline"} />}
          />
        </FloatButton.Group>

        <CreateShipment open={open} onClose={onClose} />
      </Container>
    </>
  );
};

export default Shipments;
