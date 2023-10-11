import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import { usePaginate, useToggle } from "@tam11a/react-use-hooks";
import CreateBranch from "./components/CreateBranch";
import BranchColumn from "./components/BranchColumn";
import { useGetBranch } from "@/queries/branch";
import { BsSearch } from "react-icons/bs";
import { FloatButton, Input } from "antd";
import Iconify from "@components/iconify";
import { AccessMargin } from "@tam11a/react-use-access";
import defaultPermissions from "@/utilities/defaultPermissions";
const DataTable = React.lazy(() => import("@/components/Datatable"));

const Branches: React.FC = () => {
  const { search, setSearch, getQueryParams, limit, setLimit, page, setPage } =
    usePaginate();

  const { data, isLoading } = useGetBranch(getQueryParams());
  const { state: open, toggleState: onClose } = useToggle(false);

  return (
    <AccessMargin to={defaultPermissions.INVENTORY} defaultFallback>
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
                {/* {t("employee:EmployeeList")} */}
                Branch
              </Typography>
            </div>
            <Input
              className="w-full sm:max-w-xs"
              placeholder="Search Branch"
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

        <FloatButton.Group shape="square" className="bottom-20">
          <FloatButton
            icon={<Iconify icon={"material-symbols:add"} />}
            onClick={() => onClose()}
          />
        </FloatButton.Group>

        {/* Dialog Box */}
        <CreateBranch open={open} onClose={onClose} />
      </Container>
    </AccessMargin>
  );
};

export default Branches;
