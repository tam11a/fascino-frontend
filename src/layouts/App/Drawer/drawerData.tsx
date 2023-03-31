import { IDrawerData } from "../types";
import { Icon } from "@iconify/react";
import { VscSignOut } from "react-icons/vsc";

export const DrawerData = (logout?: () => void): IDrawerData[] => [
  {
    title: "General",
    sublist: [
      {
        name: "Dashboard",
        icon: <Icon icon="mdi-light:view-dashboard" />,
        to: "/app",
      },
      {
        name: "POS",
        icon: (
          <Icon icon="fontisto:shopping-pos-machine" className="mx-[0.3rem]" />
        ),
        to: "/app/pos",
      },
    ],
  },
  {
    title: "Inventory",
    sublist: [
      {
        name: "Products",
        icon: <Icon icon="circum:shopping-basket" />,
        to: "/app/products",
      },
      {
        name: "Orders",
        icon: <Icon icon="system-uicons:cart" />,
        to: "/app/orders",
      },
      {
        name: "Categories",
        icon: <Icon icon="system-uicons:tag" className="-rotate-90" />,
        to: "/app/category",
      },
      {
        name: "Branches",
        icon: <Icon icon="ph:git-branch-light" />,
        to: "/app/branches",
      },
      {
        name: "Customers",
        icon: <Icon icon="fluent:people-20-regular" />,
        to: "/app/customer",
      },
      {
        name: "Suppliers",
        icon: <Icon icon="ph:package-light" />,
        to: "/app/suppliers",
      },
      {
        name: "Tailors",
        icon: <Icon icon="game-icons:sewing-machine" />,
        to: "/app/tailors",
      },
      {
        name: "Shipment",
        icon: <Icon icon="carbon:delivery" />,
        to: "/app/shipment",
      },
    ],
  },
  {
    title: "Reports",
    sublist: [
      {
        name: "Sales",
        icon: <Icon icon="carbon:report-data" />,
        to: "/app/sales",
      },
    ],
  },
  {
    title: "Additional",
    sublist: [
      {
        name: "Roles",
        icon: <Icon icon="fluent:person-key-20-regular" />,
        to: "/app/roles",
      },
      {
        name: "Employees",
        icon: <Icon icon="clarity:employee-group-line" />,
        to: "/app/employees",
      },
    ],
  },
  {
    title: "Personal",
    sublist: [
      {
        name: "Settings",
        icon: <Icon icon="clarity:cog-line" />,
        to: "/app/settings",
      },
      {
        name: "Sign Out",
        icon: <VscSignOut />,
        function: logout,
      },
    ],
  },
];
