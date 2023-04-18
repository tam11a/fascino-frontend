import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import { usePaginate, useToggle } from "@tam11a/react-use-hooks";
import { BsSearch } from "react-icons/bs";
import { FloatButton, Input } from "antd";
import Iconify from "@components/iconify";
import ItemColumn from "./components/ItemColumn";
import { useGetItem } from "@/queries/item";
import { useParams } from "react-router-dom";
import { GridSelectionModel } from "@mui/x-data-grid";
import ItemDrawer from "./components/ItemDrawer";
import FilterDrawer from "./components/FilterDrawer";
const DataTable = React.lazy(() => import("@/components/Datatable"));

const Item: React.FC = () => {
  const { bid } = useParams();
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
  } = usePaginate({
    defaultParams: {
      filters: {
        branch: bid || "",
      },
    },
  });
  const { data, isLoading } = useGetItem(getQueryParams());
  const [rowSelectionModel, setRowSelectionModel] =
    React.useState<GridSelectionModel>([]);
  const { state: open, toggleState: onClose } = useToggle(false);
  const { state: openFilter, toggleState: onCloseFilter } = useToggle(false);

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
                Items List
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
              onSelectionModelChange={(
                newRowSelectionModel: GridSelectionModel
              ) => {
                setRowSelectionModel(newRowSelectionModel);
              }}
              selectionModel={rowSelectionModel}
            />
          </Grid>
        </Grid>

        <FloatButton.Group shape="square" className="bottom-20 sm:bottom-4">
          <FloatButton
            icon={
              <Iconify
                icon={"material-symbols:filter-alt-outline"}
                onClick={onCloseFilter}
              />
            }
          />
          {!!rowSelectionModel.length ? (
            <>
              <FloatButton
                icon={<Iconify icon={"mi:edit"} onClick={() => onClose()} />}
              />
              <FloatButton
                icon={
                  <Iconify
                    icon={"material-symbols:print-add-outline-rounded"}
                  />
                }
              />
            </>
          ) : (
            ""
          )}
        </FloatButton.Group>

        <ItemDrawer
          open={open}
          onClose={onClose}
          selectedRowData={rowSelectionModel}
        />
        <FilterDrawer
          setFilterField={setFilterField}
          watch={watch}
          open={openFilter}
          onClose={onCloseFilter}
          getQueryParams={getQueryParams}
        />
      </Container>
    </>
  );
};

export default Item;
