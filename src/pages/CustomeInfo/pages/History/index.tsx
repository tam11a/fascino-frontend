import DataTable from "@components/Datatable";
import { Container, Grid, Typography } from "@mui/material";
import { usePaginate } from "@tam11a/react-use-hooks";
import React from "react";
import HistoryColumn from "./components/HistoryColumn";
import { useParams } from "react-router-dom";
import { useGetOrders } from "@/queries/order";

const History: React.FC = () => {
  const { cid } = useParams();
  const { getQueryParams, limit, setLimit, page, setPage } = usePaginate({
    defaultParams: {
      filters: {
        customer: cid || "",
      },
    },
  });
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
              <Typography variant="subtitle1" fontWeight={700}>
                Order History
              </Typography>
            </div>
          </Grid>

          <Grid item>
            <DataTable
              columns={HistoryColumn()}
              rows={data?.data?.data || []}
              isLoading={isLoading}
              getRowId={(r: any) => r?._id || r.id}
              rowCount={data?.data?.total || 0}
              page={page}
              paginationMode={"server"}
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

export default History;
