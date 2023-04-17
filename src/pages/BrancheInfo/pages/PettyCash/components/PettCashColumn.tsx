// import defaultPermissions from "@/utilities/defaultPermissions";
import { IDataTable } from "@/types";
import { Chip } from "@mui/material";
import { GridColumns } from "@mui/x-data-grid";
import moment from "moment";
// import { checkAccess } from "@tam11a/react-use-access";
// import moment from "moment";

const PettyCashColumn = (): GridColumns<IDataTable> => {
  return [
    {
      headerName: "Amount",
      headerAlign: "center",
      field: "amount",
      align: "center",
      width: 150,
      minWidth: 150,
      flex: 1,
    },
    {
      headerName: "Reason",
      headerAlign: "center",
      field: "reason",
      align: "center",
      width: 150,
      minWidth: 150,
      flex: 1,
    },

    {
      headerName: "Created By",
      field: "createdBy",
      width: 170,
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: (data: any) =>
        data.row?.createdBy?.userName ? (
          <Chip
            label={data.row?.createdBy?.userName}
            // sx={{
            //   textTransform: "uppercase",
            // }}
          />
        ) : (
          "-"
        ),
    },
    {
      headerName: "Created At",
      field: "createdAt",
      width: 170,
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: (data: any) =>
        data.row ? moment(data.row?.createdAt).format("LL") : "-",
    },
  ];
};

export default PettyCashColumn;
