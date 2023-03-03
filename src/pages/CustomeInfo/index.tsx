import React from "react";
import Navigator from "./Navigator";
import { Container } from "@mui/material";
import CustomerRoutes from "./routes";

const CustomerInfo: React.FC = () => {
  return (
    <>
      <Navigator />
      <Container>
        <CustomerRoutes />
      </Container>
    </>
  );
};

export default CustomerInfo;
