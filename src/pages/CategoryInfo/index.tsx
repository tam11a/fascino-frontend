import React from "react";
import Navigator from "./Navigator";
import { Container } from "@mui/material";
import CategoryRoutes from "./routes";

const CategoryInfo: React.FC = () => {
  return (
    <>
      <Navigator />
      <Container>
        <CategoryRoutes />
      </Container>
    </>
  );
};

export default CategoryInfo;
