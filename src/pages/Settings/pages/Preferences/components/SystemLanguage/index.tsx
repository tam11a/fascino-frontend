import React from "react";
import { Icon, Tooltip, Typography } from "@mui/material";
import { Select } from "antd";
import { AiFillInfoCircle } from "react-icons/ai";

const SystemLanguage: React.FC = () => {
  return (
    <>
      <Typography
        variant="overline"
        className="flex flex-row items-center gap-2 mt-3"
      >
        System Language
        <Tooltip
          title="Change system language to your preferences"
          arrow
          placement="right"
        >
          <Icon color={"action"} className="text-base mb-1">
            <AiFillInfoCircle />
          </Icon>
        </Tooltip>
      </Typography>
      <Select
        options={[
          {
            label: "English",
            value: "en",
          },
          {
            label: "বাংলা",
            value: "bn",
          },
        ]}
        // value={i18n.language}
        className="w-full"
        size="large"
        // onChange={(v) => {
        //   i18n.changeLanguage(v);
        //   localStorage.setItem("r_lng", v);
        // }}
      />
    </>
  );
};

export default SystemLanguage;
