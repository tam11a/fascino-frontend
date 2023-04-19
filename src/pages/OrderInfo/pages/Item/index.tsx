import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import { usePaginate, useToggle } from "@tam11a/react-use-hooks";
import { BsSearch } from "react-icons/bs";
import { Input } from "antd";
import ItemColumn from "./components/ItemColumn";
import { useParams } from "react-router-dom";
import { GridSelectionModel } from "@mui/x-data-grid";
import ItemDrawer from "./components/ItemDrawer";
const DataTable = React.lazy(() => import("@/components/Datatable"));
import { useGetItemsByOrderId } from "@/queries/order";

const Item: React.FC = () => {
  const { oid } = useParams();
  const { search, setSearch, limit, setLimit, page, setPage } = usePaginate();

  const { data, isLoading } = useGetItemsByOrderId(oid);
  const [rowSelectionModel, setRowSelectionModel] =
    React.useState<GridSelectionModel>([]);
  const { state: open, toggleState: onClose } = useToggle(false);
  console.log(data?.data?.data.docs);

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
              rows={data?.data?.data?.docs || []}
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
        <ItemDrawer
          open={open}
          onClose={onClose}
          selectedRowData={rowSelectionModel}
        />
      </Container>
    </>
  );
};

export default Item;
