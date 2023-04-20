import { useGetProducts } from "@/queries/products";
import DataTable from "@components/Datatable";
import Iconify from "@components/iconify";
import { Container, Grid, Typography } from "@mui/material";
import { usePaginate, useToggle } from "@tam11a/react-use-hooks";
import { FloatButton, Input } from "antd";
import React from "react";
import { BsSearch } from "react-icons/bs";
import CreateProduct from "./components/CreateProduct";
import ProductColumn from "./components/ProductColumn";
import FilterDrawer from "./components/FilterDrawer";

const Products: React.FC = () => {
  const {
    limit,
    setLimit,
    page,
    setPage,
    getQueryParams,
    setSearch,
    search,
    setFilterField,
    watch,
  } = usePaginate();

  const { data, isLoading } = useGetProducts(getQueryParams());
  const { state: open, toggleState: onClose } = useToggle(false);
  const { state: openFiler, toggleState: onCloseFilter } = useToggle(false);

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
                Products
              </Typography>
            </div>
            <Input
              className="w-full sm:max-w-xs"
              placeholder="Search Products"
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
              columns={ProductColumn()}
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

        <FloatButton.Group shape="square" className="bottom-20 ">
          <FloatButton
            icon={
              <Iconify
                icon={"material-symbols:filter-alt-outline"}
                onClick={() => onCloseFilter()}
              />
            }
          />
          <FloatButton
            icon={<Iconify icon={"material-symbols:add"} />}
            onClick={() => onClose()}
          />
        </FloatButton.Group>

        <CreateProduct open={open} onClose={onClose} />
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

export default Products;
