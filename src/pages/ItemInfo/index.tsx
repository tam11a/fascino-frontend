import React from "react";
import Navigator from "./Navigator";
import { Container } from "@mui/material";
import ItemRoutes from "./routes";

const ItemInfo: React.FC = () => {
  return (
    <>
      <Navigator />
      <Container>
        <ItemRoutes />
      </Container>
    </>
  );
};

export default ItemInfo;
