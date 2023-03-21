import React from "react";
import { Button, Container, Grid, Paper, Typography } from "@mui/material";
import { usePaginate, useToggle } from "@tam11a/react-use-hooks";
import CreateBranch from "./components/CreateBranch";
import BranchColumn from "./components/BranchColumn";
import { useGetBranch } from "@/queries/branch";
import BackButton from "@components/BackButton";
import { BsSearch } from "react-icons/bs";
import { Input, Select } from "antd";
const DataTable = React.lazy(() => import("@/components/Datatable"));

const Branches: React.FC = () => {
  const { search, setSearch, getQueryParams, limit, setLimit, page, setPage } =
    usePaginate();

  const { data, isLoading } = useGetBranch(getQueryParams());
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
                Branches
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
                placeholder="Search Branch"
                suffix={<BsSearch />}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ width: "auto" }}
                size="large"
              />
              <Select className="grow" size="large" style={{ minWidth: 250 }} />
              <Button variant="contained" onClick={() => onClose()}>
                Create Branch
              </Button>
            </Grid>
          </Paper>

          <Grid item>
            <DataTable
              columns={BranchColumn()}
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

        {/* Dialog Box */}
        <CreateBranch open={open} onClose={onClose} />
      </Container>
    </>
  );
};

export default Branches;
