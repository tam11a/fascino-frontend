// import defaultPermissions from "@/utilities/defaultPermissions";
import { IDataTable } from "@/types";
import { Chip, IconButton } from "@mui/material";
import { GridColumns } from "@mui/x-data-grid";
// import { checkAccess } from "@tam11a/react-use-access";
// import moment from "moment";
import { FiEdit2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const HistoryColumn = (): GridColumns<IDataTable> => {
  const navigate = useNavigate();
  return [
    {
      headerName: "Invoice Id",
      headerAlign: "center",
      field: "invoice",
      align: "center",
      width: 250,
      minWidth: 200,
    },
    {
      headerName: "Total",
      headerAlign: "center",
      field: "total",
      align: "center",
      flex: 1,
      width: 100,
      minWidth: 80,
    },
    {
      headerName: "Type",
      headerAlign: "center",
      field: "type",
      align: "center",
      flex: 1,
      width: 100,
      minWidth: 80,
    },
    {
      headerName: "Created by",
      field: "createdBy",
      headerAlign: "center",
      align: "center",
      width: 150,
      minWidth: 150,
      renderCell: (data: any) =>
        data.row?.createdBy?.userName ? (
          <Chip label={data.row?.createdBy?.userName} />
        ) : (
          "-"
        ),
    },
    {
      headerName: "Action",
      field: "action",
      width: 70,
      minWidth: 60,
      headerAlign: "center",
      align: "center",
      renderCell: (data: any) => (
        <>
          <IconButton
            sx={{ fontSize: "large" }}
            color="primary"
            onClick={() => navigate(`/app/orders/${data.row?._id}`)}
            // disabled={!checkAccess(defaultPermissions.EMPLOYEES.FULL)}
          >
            <FiEdit2 />
          </IconButton>
        </>
      ),
    },
  ];
};

export default HistoryColumn;
