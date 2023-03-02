import { Avatar } from "@mui/material";
import React from "react";

const NotFound: React.FC = () => {
  return (
    <>
      <Avatar
        src={"/404.svg"}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90vw",
          maxWidth: "780px",
          height: "auto",
        }}
        variant={"square"}
      />
    </>
  );
};

export default NotFound;
