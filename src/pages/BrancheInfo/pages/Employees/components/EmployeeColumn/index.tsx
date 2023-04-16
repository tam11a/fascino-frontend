// import defaultPermissions from "@/utilities/defaultPermissions";
import { Chip } from "@mui/material";
import { GridColumns } from "@mui/x-data-grid";
import { IDataTable } from "@/pages/Employees/types";
// import { checkAccess } from "@tam11a/react-use-access";
// import moment from "moment";
import { useNavigate } from "react-router-dom";

const EmployeeColumn = (): GridColumns<IDataTable> => {
  const navigate = useNavigate();

  return [
    {
      headerName: "ID",
      headerAlign: "center",
      field: "_id",
      align: "center",
      width: 240,
      // flex: 1,
      sortable: false,
      hide: false,
    },

    {
      headerName: "Name",
      headerAlign: "center",
      field: "fullName",
      align: "center",
      width: 250,
      minWidth: 220,
      flex: 1,
      renderCell: (data: any) =>
        data.row?.admin ? (
          <Chip
            label={data.row?.admin?.fullName}
            onClick={() => navigate(`/app/employee/${data.row?.admin._id}`)}
          />
        ) : (
          "-"
        ),
    },
    {
      headerName: "Email",
      headerAlign: "center",
      field: "email",
      align: "center",
      width: 250,
      minWidth: 220,
      flex: 1,
      renderCell: (data: any) => data.row?.admin?.email,
    },
    {
      headerName: "Phone",
      headerAlign: "center",
      field: "phone",
      align: "center",
      width: 200,
      minWidth: 170,
      flex: 1,
      renderCell: (data: any) => data.row?.admin?.phone,
    },
    {
      headerName: "Gender",
      headerAlign: "center",
      field: "gender",
      align: "center",
      width: 120,
      minWidth: 100,
      flex: 1,
      renderCell: (data: any) => data.row?.admin?.gender,
    },
  ];
};

export default EmployeeColumn;
