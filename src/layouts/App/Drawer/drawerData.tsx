import defaultPermissions from "@/utilities/defaultPermissions";
import { IDrawerData } from "../types";
import { Icon } from "@iconify/react";
import { useAccessContext } from "@tam11a/react-use-access";
import { VscSignOut } from "react-icons/vsc";

export const DrawerData = (logout?: () => void): IDrawerData[] => {
  const { checkAccess } = useAccessContext();
  return [
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
            <Icon
              icon="fontisto:shopping-pos-machine"
              className="mx-[0.3rem]"
            />
          ),
          to: "/app/pos",
          hide: !checkAccess(defaultPermissions.POS),
        },
      ],
    },
    {
      title: "Inventory",
      hide: !checkAccess(defaultPermissions.INVENTORY),
      sublist: [
        {
          name: "Products",
          icon: <Icon icon="circum:shopping-basket" />,
          to: "/app/products",
          hide: !checkAccess(defaultPermissions.INVENTORY),
        },
        {
          name: "Orders",
          icon: <Icon icon="system-uicons:cart" />,
          to: "/app/orders",
          hide: !checkAccess(defaultPermissions.INVENTORY),
        },
        {
          name: "Categories",
          icon: <Icon icon="system-uicons:tag" className="-rotate-90" />,
          to: "/app/category",
          hide: !checkAccess(defaultPermissions.INVENTORY),
        },
        {
          name: "Branches",
          icon: <Icon icon="ph:git-branch-light" />,
          to: "/app/branches",
          hide: !checkAccess(defaultPermissions.INVENTORY),
        },
        {
          name: "Customers",
          icon: <Icon icon="fluent:people-20-regular" />,
          to: "/app/customer",
          hide: !checkAccess(defaultPermissions.INVENTORY),
        },
        {
          name: "Suppliers",
          icon: <Icon icon="ph:package-light" />,
          to: "/app/suppliers",
          hide: !checkAccess(defaultPermissions.INVENTORY),
        },
        {
          name: "Tailors",
          icon: <Icon icon="game-icons:sewing-machine" />,
          to: "/app/tailors",
          hide: !checkAccess(defaultPermissions.INVENTORY),
        },
        {
          name: "Shipment",
          icon: <Icon icon="carbon:delivery" />,
          to: "/app/shipment",
          hide: !checkAccess(defaultPermissions.INVENTORY),
        },
      ],
    },
    {
      title: "Reports",
      hide: !checkAccess(defaultPermissions.SALES),
      sublist: [
        {
          name: "Sales",
          icon: <Icon icon="carbon:report-data" />,
          to: "/app/sales",
          hide: !checkAccess(defaultPermissions.SALES),
        },
      ],
    },
    {
      title: "Additional",
      hide: !checkAccess(defaultPermissions.EMPLOYEES),
      sublist: [
        {
          name: "Roles",
          icon: <Icon icon="fluent:person-key-20-regular" />,
          to: "/app/roles",
          hide: !checkAccess(defaultPermissions.EMPLOYEES),
        },
        {
          name: "Employees",
          icon: <Icon icon="clarity:employee-group-line" />,
          to: "/app/employees",
          hide: !checkAccess(defaultPermissions.EMPLOYEES),
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
};
