import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import { usePaginate, useToggle } from "@tam11a/react-use-hooks";
import { FloatButton, Input } from "antd";
import { BsSearch } from "react-icons/bs";
import Iconify from "@components/iconify";
import CategoryColumn from "./components/CategoryColumn";
import DataTable from "@components/Datatable";
import { useGetCategories } from "@/queries/category";
import CreateCategory from "./components/CreateCategory";
import { AccessMargin } from "@tam11a/react-use-access";
import defaultPermissions from "@/utilities/defaultPermissions";

const Info: React.FC = () => {
  const { search, setSearch, getQueryParams, limit, setLimit, page, setPage } =
    usePaginate({
      defaultParams: {
        limit: 50,
      },
    });
  const { data, isLoading } = useGetCategories(getQueryParams());
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
                Category
              </Typography>
            </div>
            <Input
              className="w-full sm:max-w-xs"
              placeholder="Search Category"
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
              columns={CategoryColumn()}
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
        <FloatButton.Group shape="square" className="bottom-20">
          <FloatButton
            icon={<Iconify icon={"material-symbols:add"} />}
            onClick={() => onClose()}
          />
        </FloatButton.Group>
        {/* Dialog Box */}
        <CreateCategory open={open} onClose={onClose} />
      </Container>
    </AccessMargin>
  );
};

export default Info;
