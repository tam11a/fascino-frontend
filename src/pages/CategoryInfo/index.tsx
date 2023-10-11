import React from "react";
import Navigator from "./Navigator";
import { Container } from "@mui/material";
import CategoryRoutes from "./routes";
import { AccessMargin } from "@tam11a/react-use-access";
import defaultPermissions from "@/utilities/defaultPermissions";

const CategoryInfo: React.FC = () => {
  return (
    <AccessMargin to={defaultPermissions.INVENTORY} defaultFallback>
      <Navigator />
      <Container>
        <CategoryRoutes />
      </Container>
    </AccessMargin>
  );
};

export default CategoryInfo;
