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
