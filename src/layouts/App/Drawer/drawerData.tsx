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
        name: "Products",
        icon: <Icon icon="circum:shopping-basket" />,
        to: "/products",
      },
      {
        name: "Customers",
        icon: <Icon icon="fluent:people-20-regular" />,
        to: "/app/roles",
      },
    ],
  },
  {
    title: "Additional",
    sublist: [
      {
        name: "Sales",
        icon: <Icon icon="carbon:report-data" />,
        to: "/app/employees",
      },
      {
        name: "Branches",
        icon: <Icon icon="ph:git-branch-light" />,
        to: "/app/employees",
      },
      {
        name: "Suppliers",
        icon: <Icon icon="ph:package-light" />,
        to: "/app/employees",
      },
      {
        name: "Roles",
        icon: <Icon icon="fluent:person-key-20-regular" />,
        to: "/app/employees",
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
