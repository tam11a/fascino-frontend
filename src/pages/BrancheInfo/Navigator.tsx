import React from "react";
import { Icon } from "@iconify/react";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { Branch_ROUTES } from "./routes/paths";

const items: MenuProps["items"] = [
  {
    label: "Branch",
    key: Branch_ROUTES.INFO,
    icon: <Icon icon="fluent:building-shop-20-regular" className="text-xl" />,
  },
  {
    label: "Employee",
    key: Branch_ROUTES.EMPLOYEE,
    icon: <Icon icon="clarity:employee-line" className="text-xl" />,
  },
  {
    label: "Items",
    key: Branch_ROUTES.ITEM,
    icon: <Icon icon="gridicons:product" className="text-xl" />,
  },
  {
    label: "Petty Cash",
    key: Branch_ROUTES.PETTYCASH,
    icon: <Icon icon="mdi:cash-check" className="text-xl" />,
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
