import React from "react";
import EmployeeRoutes from "./routes";
import Navigator from "./Navigator";
import { Container } from "@mui/material";

const employeeInfo: React.FC = () => {
  return (
    <>
      <Navigator />
      <Container>
        <EmployeeRoutes />
      </Container>
    </>
  );
};

export default employeeInfo;
