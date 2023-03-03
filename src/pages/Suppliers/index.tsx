import React from "react";
import { Button, Container, Grid, Typography } from "@mui/material";
import { usePaginate, useToggle } from "@tam11a/react-use-hooks";
import { useGetSuppliers } from "@/queries/suppliers";
import SupplierColumn from "./components/SupplierColumn";
import CreateSupplier from "./components/CreateSupplier";
// import { AccessMargin } from "@tam11a/react-use-access";
// import defaultPermissions from "@/utilities/defaultPermissions";
// import { t } from "i18next";

const DataTable = React.lazy(() => import("@/components/Datatable"));

const Suppliers: React.FC = () => {
  const { limit, setLimit, page, setPage, getQueryParams } = usePaginate();

  const { data, isLoading } = useGetSuppliers(getQueryParams());
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
            <Typography variant="subtitle1" fontWeight={700}>
              {/* {t("Supplier:SupplierList")} */}
              Supplier List
            </Typography>
            {/* <AccessMargin to={defaultPermissions.SupplierS.FULL}> */}
            <Button variant="contained" onClick={() => onClose()}>
              {/* {t("Supplier:CreateSupplier")} */}
              Create Supplier
            </Button>
            {/* </AccessMargin> */}
          </Grid>
          <Grid item>
            <DataTable
              columns={SupplierColumn()}
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

        {/* Dialog Box */}
        <CreateSupplier open={open} onClose={onClose} />
      </Container>
    </>
  );
};

export default Suppliers;
