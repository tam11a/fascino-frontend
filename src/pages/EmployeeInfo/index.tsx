import React from "react";
import EmployeeRoutes from "./routes";
import Navigator from "./Navigator";
import { Container } from "@mui/material";
import { AccessMargin } from "@tam11a/react-use-access";
import defaultPermissions from "@/utilities/defaultPermissions";

const employeeInfo: React.FC = () => {
  return (
    <AccessMargin to={defaultPermissions.EMPLOYEES} defaultFallback>
      <Navigator />
      <Container>
        <EmployeeRoutes />
      </Container>
    </AccessMargin>
  );
};

export default employeeInfo;
