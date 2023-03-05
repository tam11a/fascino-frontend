import React from "react";
import Navigator from "./Navigator";
import { Container } from "@mui/material";
import ProductRoutes from "./routes";

const ProductInfo: React.FC = () => {
  return (
    <>
      <Navigator />
      <Container>
        <ProductRoutes />
      </Container>
    </>
  );
};

export default ProductInfo;
