import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import { usePaginate, useToggle } from "@tam11a/react-use-hooks";
import { useGetSuppliers } from "@/queries/suppliers";
import SupplierColumn from "./components/SupplierColumn";
import CreateSupplier from "./components/CreateSupplier";
import BackButton from "@components/BackButton";
import { FloatButton, Input } from "antd";
import { BsSearch } from "react-icons/bs";
import Iconify from "@components/iconify";
// import { AccessMargin } from "@tam11a/react-use-access";
// import defaultPermissions from "@/utilities/defaultPermissions";
// import { t } from "i18next";

const DataTable = React.lazy(() => import("@/components/Datatable"));

const Suppliers: React.FC = () => {
  const { search, setSearch, getQueryParams, limit, setLimit, page, setPage } =
    usePaginate();

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
          <Grid className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex flex-row items-center ">
              <BackButton />
              <Typography variant="subtitle1" fontWeight={700}>
                {/* {t("employee:EmployeeList")} */}
                Suppliers
              </Typography>
            </div>
            <Input
              className="w-full sm:max-w-xs"
              placeholder="Search Suppliers"
              suffix={<BsSearch />}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: "auto" }}
              size="large"
            />
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
        <FloatButton.Group shape="square" className="bottom-20 sm:bottom-4">
          <FloatButton
            icon={<Iconify icon={"material-symbols:filter-alt-outline"} />}
          />
          <FloatButton
            icon={<Iconify icon={"material-symbols:add"} />}
            onClick={() => onClose()}
          />
        </FloatButton.Group>

        {/* Dialog Box */}
        <CreateSupplier open={open} onClose={onClose} />
      </Container>
    </>
  );
};

export default Suppliers;
