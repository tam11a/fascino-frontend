import React from "react";
import Navigator from "./Navigator";
import { Container } from "@mui/material";
import { branchRoutes } from "./routes/paths";

const BranchInfo: React.FC = () => {
  return (
    <>
      <Navigator />
      <Container>
        <branchRoutes />
      </Container>
    </>
  );
};

export default BranchInfo;
