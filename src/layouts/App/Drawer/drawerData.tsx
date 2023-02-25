import { IDrawerData } from "../types";
import { Icon } from "@iconify/react";
// import { MdOutlineSettings } from "react-icons/md";
// import { VscSignOut } from "react-icons/vsc";

export const DrawerData = (): IDrawerData[] => [
  {
    title: "General",
    sublist: [
      {
        name: "Dashboard",
        icon: <Icon icon="carbon:dashboard" />,
        to: "/app",
      },
    ],
  },
];
