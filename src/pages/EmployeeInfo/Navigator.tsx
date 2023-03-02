import React from "react";
import { Icon } from "@iconify/react";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { Employee_ROUTES } from "./routes/paths";

const items: MenuProps["items"] = [
  {
    label: "Personal",
    key: Employee_ROUTES.INFO,
    icon: <Icon icon="mdi:information-slab-box-outline" className="text-xl" />,
  },
  {
    label: "Additional",
    key: Employee_ROUTES.ADDITIONAL,
    icon: <Icon icon="mdi:information-slab-box-outline" className="text-xl" />,
  },
];

const Navigator: React.FC = () => {
  // To get the current location pathname
  let location = useLocation();

  // To route
  const navigate = useNavigate();
  const onClick: MenuProps["onClick"] = (e) => {
    navigate(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[location.pathname?.split?.("/")[4] || ""]}
      mode="horizontal"
      items={items}
      className={"mb-1 justify-center"}
    />
  );
};

export default Navigator;
