import React from "react";
import Navigator from "./Navigator";
import { Container } from "@mui/material";
import TailorRoutes from "./routes";

const TailorInfo: React.FC = () => {
  return (
    <>
      <Navigator />
      <Container>
        <TailorRoutes />
      </Container>
    </>
  );
};

export default TailorInfo;
