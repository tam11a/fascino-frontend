import React from "react";
import { Button, Container, Grid, Typography } from "@mui/material";
import { useToggle } from "@tam11a/react-use-hooks";
// import { AccessMargin } from "@tam11a/react-use-access";
// import defaultPermissions from "@/utilities/defaultPermissions";
import CustomerColumn from "./components/CustomerColumn";
import CreateCustomer from "./components/CreateCustomer";
import { useGetCustomers } from "@/queries/customer";
// import { t } from "i18next";

const DataTable = React.lazy(() => import("@/components/Datatable"));

const Customer: React.FC = () => {
  const { data, isLoading } = useGetCustomers();
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
              {/* {t("employee:EmployeeList")} */}
              Customers
            </Typography>
            {/* <AccessMargin to={defaultPermissions.EMPLOYEES.FULL}> */}
            <Button variant="contained" onClick={() => onClose()}>
              {/* {t("employee:CreateEmployee")} */}
              Create Customer
            </Button>
            {/* </AccessMargin> */}
          </Grid>
          <Grid item>
            <DataTable
              columns={CustomerColumn()}
              rows={data?.data?.data || []}
              isLoading={isLoading}
              getRowId={(r: any) => r?._id || r.id}
            />
          </Grid>
        </Grid>

        {/* Dialog Box */}
        <CreateCustomer open={open} onClose={onClose} />
      </Container>
    </>
  );
};

export default Customer;
