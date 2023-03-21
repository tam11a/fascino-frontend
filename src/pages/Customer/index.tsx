import React from "react";
import { Button, Container, Grid, Paper, Typography } from "@mui/material";
import { usePaginate, useToggle } from "@tam11a/react-use-hooks";
// import { AccessMargin } from "@tam11a/react-use-access";
// import defaultPermissions from "@/utilities/defaultPermissions";
import CustomerColumn from "./components/CustomerColumn";
import CreateCustomer from "./components/CreateCustomer";
import { useGetCustomers } from "@/queries/customer";
import BackButton from "@components/BackButton";
import { Input, Select } from "antd";
import { BsSearch } from "react-icons/bs";
// import { t } from "i18next";

const DataTable = React.lazy(() => import("@/components/Datatable"));

const Customer: React.FC = () => {
  const { search, setSearch, getQueryParams, limit, setLimit, page, setPage } =
    usePaginate();
  const { data, isLoading } = useGetCustomers(getQueryParams());
  const { state: open, toggleState: onClose } = useToggle(false);

  return (
    <>
      <Container
        maxWidth={"lg"}
        sx={{
          maxWidth: "1500px !important",
        }}
      >
        <Grid container rowGap={1} direction="column" marginTop={4}>
          <Grid className="flex flex-row">
            <div className="flex flex-row">
              <BackButton />
              <Typography variant="subtitle1" fontWeight={700}>
                {/* {t("employee:EmployeeList")} */}
                Customers
              </Typography>
            </div>
            {/* <AccessMargin to={defaultPermissions.EMPLOYEES.FULL}> */}

            {/* </AccessMargin> */}
          </Grid>
          <Paper
            elevation={0}
            sx={{
              p: 1,
              border: "1px solid #ccc",
              my: 1,
            }}
          >
            <Grid container className="flex flex-row gap-2">
              <Input
                className="grow"
                placeholder="Search Customers"
                suffix={<BsSearch />}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ width: "auto" }}
                size="large"
              />
              <Select className="grow" size="large" style={{ minWidth: 250 }} />
              <Button
                size="large"
                variant="contained"
                onClick={() => onClose()}
              >
                Create Customers
              </Button>
            </Grid>
          </Paper>
          <Grid item>
            <DataTable
              columns={CustomerColumn()}
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

        {/* Dialog Box */}
        <CreateCustomer open={open} onClose={onClose} />
      </Container>
    </>
  );
};

export default Customer;
