import React from "react";
import { IconButton, ListItem, ListItemIcon } from "@mui/material";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const BackButton: React.FC = ({ ...others }) => {
  const navigate = useNavigate();
  return (
    <ListItem {...others} disablePadding sx={{ mx: 1 }}>
      <ListItemIcon sx={{ minWidth: "45px" }}>
        <IconButton
          size={"small"}
          sx={{
            boxShadow: "unset",
            border: "2px solid #00000011",
            borderRadius: "2px",
            background: "transparent",
            width: "35px",
            height: "35px",
            p: 0,
          }}
          color={"default"}
          onClick={() => {
            navigate(-1);
          }}
        >
          <BiArrowBack />
        </IconButton>
      </ListItemIcon>
    </ListItem>
  );
};

export default BackButton;
