import { Dialog, DialogContent, Divider, Grid, Hidden } from "@mui/material";
import React from "react";
import RoleList from "./components/RoleList";
import RoleItem from "./components/RoleItem";
import { useLocation, useNavigate } from "react-router-dom";
import { AccessMargin } from "@tam11a/react-use-access";
import defaultPermissions from "@/utilities/defaultPermissions";

const Roles: React.FC = () => {
  let location = useLocation();
  const navigate = useNavigate();
  return (
    <AccessMargin to={defaultPermissions.EMPLOYEES} defaultFallback>
      <Grid
        container
        sx={{
          height: { xs: "calc(100vh - 105px)", md: "calc(100vh - 17px)" },
        }}
      >
        <Grid item xs={12} lg={4} className={"min-w-[100px]"}>
          <RoleList />
        </Grid>
        <Hidden lgDown>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ borderStyle: "dashed" }}
          />
          <Grid item className={"grow"}>
            <RoleItem />
          </Grid>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ borderStyle: "dashed" }}
          />
        </Hidden>
      </Grid>
      <Hidden lgUp>
        <Dialog
          open={!!location.pathname?.split?.("/")[3]}
          onClose={() => navigate("/app/roles", { replace: true })}
          fullScreen
        >
          <DialogContent className="p-0">
            <RoleItem />
          </DialogContent>
        </Dialog>
      </Hidden>
    </AccessMargin>
  );
};

export default Roles;
