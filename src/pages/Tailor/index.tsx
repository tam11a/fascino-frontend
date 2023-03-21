import { useGetTailor } from "@/queries/tailor";
import BackButton from "@components/BackButton";
import DataTable from "@components/Datatable";
import Iconify from "@components/iconify";
import { Container, Grid, Typography } from "@mui/material";
import { usePaginate, useToggle } from "@tam11a/react-use-hooks";
import { FloatButton, Input } from "antd";
import React from "react";
import { BsSearch } from "react-icons/bs";
import CreateTailor from "./components/CreateTailor";
import TailorColumn from "./components/TailorColumn";

const Tailor: React.FC = () => {
  const { limit, setLimit, page, setPage, getQueryParams, setSearch, search } =
    usePaginate();

  const { data, isLoading } = useGetTailor(getQueryParams());

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
                Tailors
              </Typography>
            </div>
            <Input
              className="w-full sm:max-w-xs"
              placeholder="Search Tailor"
              suffix={<BsSearch />}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: "auto" }}
              size="large"
            />
          </Grid>

          <Grid item>
            <DataTable
              columns={TailorColumn()}
              rows={data?.data?.data || []}
              isLoading={isLoading}
              getRowId={(r: any) => r?._id}
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

        <CreateTailor open={open} onClose={onClose} />
      </Container>
    </>
  );
};

export default Tailor;
