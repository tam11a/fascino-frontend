import React from "react";
import Navigator from "./Navigator";
import { Container } from "@mui/material";
import SubcategoryRoutes from "./routes";

const SubcategoryInfo: React.FC = () => {
  return (
    <>
      <Navigator />
      <Container>
        <SubcategoryRoutes />
      </Container>
    </>
  );
};

export default SubcategoryInfo;
