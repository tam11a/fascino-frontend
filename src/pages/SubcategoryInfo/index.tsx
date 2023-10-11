import React from "react";
import Navigator from "./Navigator";
import { Container } from "@mui/material";
import SubcategoryRoutes from "./routes";
import { AccessMargin } from "@tam11a/react-use-access";
import defaultPermissions from "@/utilities/defaultPermissions";

const SubcategoryInfo: React.FC = () => {
  return (
    <AccessMargin to={defaultPermissions.INVENTORY} defaultFallback>
      <Navigator />
      <Container>
        <SubcategoryRoutes />
      </Container>
    </AccessMargin>
  );
};

export default SubcategoryInfo;
