import React from "react";

import { Icon } from "@iconify/react";

import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { SETTINGS_ROUTES } from "./routes/paths";
// import { useTranslation } from "react-i18next";

const Navigator: React.FC = () => {
  // To get the current location pathname
  let location = useLocation();
  // const { t } = useTranslation();

  // To route
  const navigate = useNavigate();
  const onClick: MenuProps["onClick"] = (e) => {
    navigate(e.key);
  };

  const items: MenuProps["items"] = [
    {
      label: "Personal",
      key: SETTINGS_ROUTES.PERSONAL,
      icon: <Icon icon="ic:twotone-person-pin" className="text-xl" />,
    },
    {
      label: "Security",
      key: SETTINGS_ROUTES.SECURITY,
      icon: <Icon icon="ic:twotone-lock-person" className="text-xl" />,
    },
    // {
    //   label: "Preferences",
    //   key: SETTINGS_ROUTES.PREFERENCES,
    //   icon: <Icon icon="pajamas:preferences" className="text-xl" />,
    // },
  ];

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[location.pathname?.split?.("/")[3] || ""]}
      mode="horizontal"
      items={items}
      className={"mb-1 justify-center"}
    />
  );
};

export default Navigator;
