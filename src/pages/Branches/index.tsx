import React from "react";
import { Button, Container, Grid, Typography } from "@mui/material";
import { useToggle } from "@tam11a/react-use-hooks";
import CreateBranch from "./components/CreateBranch";
import BranchColumn from "./components/BranchColumn";
import { useGetBranch } from "@/queries/branch";
import BackButton from "@components/BackButton";
const DataTable = React.lazy(() => import("@/components/Datatable"));

const Branches: React.FC = () => {
  const { data, isLoading } = useGetBranch();
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
            <div className="flex flex-row">
              <BackButton />
              <Typography variant="subtitle1" fontWeight={700}>
                {/* {t("employee:EmployeeList")} */}
                Branches
              </Typography>
            </div>
            {/* <AccessMargin to={defaultPermissions.EMPLOYEES.FULL}> */}
            <Button variant="contained" onClick={() => onClose()}>
              {/* {t("employee:CreateEmployee")} */}
              Create Branch
            </Button>
            {/* </AccessMargin> */}
          </Grid>
          <Grid item>
            <DataTable
              columns={BranchColumn()}
              rows={data?.data?.data || []}
              isLoading={isLoading}
              getRowId={(r: any) => r?._id || r.id}
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
