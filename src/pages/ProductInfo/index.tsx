import React from "react";
import Navigator from "./Navigator";
import { Container } from "@mui/material";
import ProductRoutes from "./routes";
import { AccessMargin } from "@tam11a/react-use-access";
import defaultPermissions from "@/utilities/defaultPermissions";

const ProductInfo: React.FC = () => {
  return (
    <AccessMargin to={defaultPermissions.INVENTORY} defaultFallback>
      <Navigator />
      <Container>
        <ProductRoutes />
      </Container>
    </AccessMargin>
  );
};

export default ProductInfo;
