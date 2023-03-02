import { GridColumns } from "@mui/x-data-grid";

export type GridNativeColTypes =
  | "string"
  | "number"
  | "date"
  | "dateTime"
  | "boolean"
  | "singleSelect";

export type GridAlignment = "left" | "right" | "center";

export type IDataTable = {
  columns: GridColumns<any>;
  rows: any;
  isLoading: boolean;
  getRowId?: any;
  checked?: boolean;
};

export type IEmployee = {
  _id: string;
  firstName: string;
  lastName: string;
  permissions: string[];
  userName: string;
  phone: string;
  email: string;
  gender: "male" | "female" | "others";
  role: {
    name: string;
    _id: string;
  };
};
