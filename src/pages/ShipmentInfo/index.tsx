import React from "react";
import Navigator from "./Navigator";
import { Container } from "@mui/material";
import BranchRoutes from "./routes";

const BranchInfo: React.FC = () => {
  return (
    <>
      <Navigator />
      <Container>
        <BranchRoutes />
      </Container>
    </>
  );
};

export default BranchInfo;
