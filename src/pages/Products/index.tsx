import { useGetProducts } from "@/queries/products";
import BackButton from "@components/BackButton";
import DataTable from "@components/Datatable";
import { Button, Container, Grid, Typography } from "@mui/material";
import { usePaginate, useToggle } from "@tam11a/react-use-hooks";
import React from "react";
import ProductColumn from "./components/ProductColumn";

const Products: React.FC = () => {
  const { limit, setLimit, page, setPage, getQueryParams } = usePaginate();

  const { data, isLoading } = useGetProducts(getQueryParams());
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
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <div className="flex flex-row">
              <BackButton />
              <Typography variant="subtitle1" fontWeight={700}>
                Products
              </Typography>
            </div>

            <Button variant="contained" onClick={() => onClose()}>
              Create Products
            </Button>
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
      </Container>
    </>
  );
};

export default Products;
