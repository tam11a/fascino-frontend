import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import { usePaginate, useToggle } from "@tam11a/react-use-hooks";
import CreateEmployee from "./components/CreateEmployee";
import EmployeeColumn from "./components/EmployeeColumn";
// import { AccessMargin } from "@tam11a/react-use-access";
// import defaultPermissions from "@/utilities/defaultPermissions";
import { useGetEmployees } from "@/queries/employees";
import { FloatButton, Input } from "antd";
import { BsSearch } from "react-icons/bs";
import Iconify from "@components/iconify";
import FilterDrawer from "./components/FilterDrawer";
// import { t } from "i18next";

const DataTable = React.lazy(() => import("@/components/Datatable"));

const Employees: React.FC = () => {
  const {
    limit,
    setLimit,
    page,
    setPage,
    getQueryParams,
    search,
    setSearch,
    watch,
    setFilterField,
  } = usePaginate();

  const { data, isLoading } = useGetEmployees(getQueryParams());
  const { state: open, toggleState: onClose } = useToggle(false);
  const { state: OpenFilter, toggleState: onCloseFilter } = useToggle(false);

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
                {/* {t("employee:EmployeeList")} */}
                Employees
              </Typography>
            </div>
            <Input
              className="w-full sm:max-w-xs"
              placeholder="Search Employees"
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
              columns={EmployeeColumn()}
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

        <FloatButton.Group shape="square" className="bottom-28">
          <FloatButton
            icon={
              <Iconify
                icon={"material-symbols:filter-alt-outline"}
                onClick={onCloseFilter}
              />
            }
          />
          <FloatButton
            icon={<Iconify icon={"material-symbols:add"} />}
            onClick={() => onClose()}
          />
        </FloatButton.Group>

        {/* Dialog Box */}
        <CreateEmployee open={open} onClose={onClose} />
        <FilterDrawer
          open={OpenFilter}
          onClose={onCloseFilter}
          setFilterField={setFilterField}
          watch={watch}
        />
      </Container>
    </>
  );
};

export default Employees;
