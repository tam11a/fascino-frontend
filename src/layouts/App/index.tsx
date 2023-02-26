import React from "react";
import { Outlet } from "react-router-dom";
import { useToggle } from "@tam11a/react-use-hooks";
import { Box, Hidden } from "@mui/material";

const AppDrawer = React.lazy(() => import("./Drawer"));
const TemporaryDrawer = React.lazy(() => import("./Drawer/TemporaryDrawer"));
// const AppHeader = lazy(() => import("./Header"));
// const AppFooter = lazy(() => import("./Footer"));

const AppLayout: React.FC | any = () => {
  const { state: open, toggleState: toggleDrawer } = useToggle(false);

  return (
    <Box sx={{ display: "flex" }}>
      <Hidden mdDown>
        <AppDrawer open={open} toggleDrawer={toggleDrawer} />
      </Hidden>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 1,
          maxWidth: "100vw",
          overflow: "hidden",
          overflowY: "auto",
        }}
      >
        <Outlet />
        <Hidden mdUp>
          <TemporaryDrawer open={open} onClose={toggleDrawer} />
          {/* <AppFooter open={open} toggleDrawer={toggleDrawer} /> */}
        </Hidden>
      </Box>
    </Box>
  );
};

export default React.memo(AppLayout);
