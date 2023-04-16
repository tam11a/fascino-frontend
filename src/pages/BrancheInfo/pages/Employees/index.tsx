import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import { usePaginate, useToggle } from "@tam11a/react-use-hooks";
import { BsSearch } from "react-icons/bs";
import { FloatButton, Input } from "antd";
import Iconify from "@components/iconify";
import ItemColumn from "./components/EmployeeColumn";
import { useParams } from "react-router-dom";
import { GridSelectionModel } from "@mui/x-data-grid";
import { useGetBranchJuntion } from "@/queries/branch";
import EmployeeDrawer from "./components/EmployeeDrawer";
const DataTable = React.lazy(() => import("@/components/Datatable"));

const Item: React.FC = () => {
  const { bid } = useParams();
  const { search, setSearch, getQueryParams, limit, setLimit, page, setPage } =
    usePaginate({
      defaultParams: {
        filters: {
          branch: bid || "",
        },
      },
    });
  const { data, isLoading } = useGetBranchJuntion(getQueryParams());
  const [rowSelectionModel, setRowSelectionModel] =
    React.useState<GridSelectionModel>([]);
  const { state: open, toggleState: onClose } = useToggle(false);

  console.log(data);
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
                Employee List
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
              checkboxSelection
              onSelectionModelChange={(newRowSelectionModel) => {
                setRowSelectionModel(newRowSelectionModel);
              }}
              selectionModel={rowSelectionModel}
            />
          </Grid>
        </Grid>

        <FloatButton.Group shape="square" className="bottom-20 sm:bottom-4">
          <FloatButton
            icon={<Iconify icon={"material-symbols:filter-alt-outline"} />}
          />
          <FloatButton
            icon={<Iconify icon={"material-symbols:add"} />}
            onClick={() => onClose()}
          />
        </FloatButton.Group>

        <EmployeeDrawer
          open={open}
          onClose={onClose}
          selectedRowData={rowSelectionModel}
        />
      </Container>
    </>
  );
};

export default Item;
