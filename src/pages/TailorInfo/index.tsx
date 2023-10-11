import React from "react";
import Navigator from "./Navigator";
import { Container } from "@mui/material";
import TailorRoutes from "./routes";
import { AccessMargin } from "@tam11a/react-use-access";
import defaultPermissions from "@/utilities/defaultPermissions";

const TailorInfo: React.FC = () => {
  return (
    <AccessMargin to={defaultPermissions.INVENTORY} defaultFallback>
      <Navigator />
      <Container>
        <TailorRoutes />
      </Container>
    </AccessMargin>
  );
};

export default TailorInfo;
