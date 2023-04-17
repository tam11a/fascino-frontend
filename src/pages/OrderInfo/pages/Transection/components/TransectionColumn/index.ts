// import defaultPermissions from "@/utilities/defaultPermissions";
import { IDataTable } from "@/types";
import { GridColumns } from "@mui/x-data-grid";
import moment from "moment";
// import { checkAccess } from "@tam11a/react-use-access";
// import moment from "moment";
// import { FiEdit2 } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";

const TransectionColumn = (): GridColumns<IDataTable> => {
  return [
    {
      headerName: "ID",
      headerAlign: "center",
      field: "_id",
      align: "center",
      width: 300,
      // flex: 1,
      sortable: false,
      hide: false,
    },
    {
      headerName: "Paid Amount",
      headerAlign: "center",
      field: "amount",
      align: "center",
      width: 80,
      minWidth: 70,
      flex: 1,
    },
    {
      headerName: "Payment Method",
      headerAlign: "center",
      field: "method",
      align: "center",
      width: 80,
      minWidth: 70,
      flex: 1,
    },
    {
      headerName: "Received At",
      headerAlign: "center",
      field: "receivedAt",
      align: "center",
      width: 80,
      minWidth: 70,
      flex: 1,
      renderCell: (data: any) =>
        moment(data?.row?.receivedAt).format("MMMM Do YYYY"),
    },
    {
      headerName: "Received By",
      headerAlign: "center",
      field: "receivedBy",
      align: "center",
      width: 80,
      minWidth: 70,
      flex: 1,
      renderCell: (data: any) => "-",
    },
  ];
};

export default TransectionColumn;
