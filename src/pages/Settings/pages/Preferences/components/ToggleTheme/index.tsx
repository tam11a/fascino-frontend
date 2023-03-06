import React from "react";
import {
  Avatar,
  Icon,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import { AiFillInfoCircle } from "react-icons/ai";

const ToggleTheme: React.FC = () => {
  return (
    <>
      <Typography
        variant="overline"
        className="flex flex-row items-center gap-2 mt-2"
      >
        Theme
        <Tooltip title="Dark mode will be added soon" arrow placement="right">
          <Icon color={"action"} className="text-base mb-1">
            <AiFillInfoCircle />
          </Icon>
        </Tooltip>
      </Typography>
      <ToggleButtonGroup
        value={"light"}
        color="primary"
        exclusive
        orientation={"horizontal"}
        className="w-full"
      >
        <ToggleButton value={"light"} className="flex-col">
          <Avatar
            variant="rounded"
            src="/assets/light_preview.svg"
            className="w-full h-auto shadow-md"
          />

          <Typography variant="subtitle2" className={"mt-3"}>
            Light
          </Typography>
        </ToggleButton>
        <ToggleButton value={"dark"} className="flex-col" disabled>
          <Avatar
            variant="rounded"
            src="/assets/dark_preview.svg"
            className="w-full h-auto  shadow-md opacity-30"
          />
          <Typography variant="subtitle2" className={"mt-3"}>
            Dark
          </Typography>
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  );
};

export default ToggleTheme;
