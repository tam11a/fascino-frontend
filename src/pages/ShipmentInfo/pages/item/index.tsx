import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import {
  usePaginate,
  useToggle,
  //  useToggle
} from "@tam11a/react-use-hooks";

import { BsSearch } from "react-icons/bs";
import { FloatButton, Input } from "antd";
import Iconify from "@components/iconify";
import ItemColumn from "./components/ItemColumn";
import { useGetItem } from "@/queries/item";
import { useParams } from "react-router-dom";
import FilterDrawer from "./components/FilterDrawer";
const DataTable = React.lazy(() => import("@/components/Datatable"));

const Item: React.FC = () => {
  const { shid } = useParams();
  const {
    search,
    setSearch,
    getQueryParams,
    limit,
    setLimit,
    page,
    setPage,
    watch,
    setFilterField,
  } = usePaginate({
    defaultParams: {
      filters: {
        shipment: shid || "",
      },
    },
  });

  const { data, isLoading } = useGetItem(getQueryParams());
  const { state: openFilter, toggleState: onCloseFilter } = useToggle(false);

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
              <Typography variant="subtitle1" fontWeight={700}>
                {/* {t("employee:EmployeeList")} */}
                Items
              </Typography>
            </div>
            <Input
              className="w-full sm:max-w-xs"
              placeholder="Search Item"
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
              columns={ItemColumn()}
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
            onClick={onCloseFilter}
            icon={<Iconify icon={"material-symbols:filter-alt-outline"} />}
          />
        </FloatButton.Group>
        <FilterDrawer
          open={openFilter}
          onClose={onCloseFilter}
          setFilterField={setFilterField}
          watch={watch}
        />
      </Container>
    </>
  );
};

export default Item;
