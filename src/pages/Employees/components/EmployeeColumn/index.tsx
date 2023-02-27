// import defaultPermissions from "@/utilities/defaultPermissions";
import { Chip, IconButton } from "@mui/material";
import { GridColumns } from "@mui/x-data-grid";
// import { checkAccess } from "@tam11a/react-use-access";
import moment from "moment";
import { FiEdit2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const EmployeeColumn = (): GridColumns<any> => {
  const navigate = useNavigate();
  return [
    {
      headerName: "ID",
      headerAlign: "center",
      field: "_id",
      align: "center",
      width: 60,
      // flex: 1,
      sortable: false,
    },
    {
      headerName: "Name",
      headerAlign: "center",
      field: "firstName",
      align: "center",
      width: 150,
      minWidth: 150,
      flex: 1,
      renderCell: (data: any) => `${data.row.firstName} ${data.row.lastName}`,
    },
    {
      headerName: "Role",
      headerAlign: "center",
      field: "role",
      align: "center",
      width: 150,
      minWidth: 150,
      flex: 1,
      renderCell: (data: any) =>
        data.row?.role?.Name ? <Chip label={data.row?.role?.name} /> : "-",
    },
    {
      headerName: "Phone",
      headerAlign: "center",
      field: "phone",
      align: "center",
      flex: 1,
      width: 160,
      minWidth: 150,
    },
    // {
    //   headerName: "Email",
    //   headerAlign: "center",
    //   field: "email",
    //   width: 200,
    //   minWidth: 200,
    //   flex: 1.5,
    //   align: "center",
    // },
    // {
    //   headerName: "Created Date",
    //   field: "createdOn",
    //   width: 220,
    //   minWidth: 150,
    //   flex: 1,
    //   headerAlign: "center",
    //   align: "center",
    //   renderCell: (data: any) => moment(data.row?.createdOn).format("lll"),
    // },
    // {
    //   headerName: "Created by",
    //   field: "createdBy",
    //   width: 170,
    //   minWidth: 150,
    //   headerAlign: "center",
    //   align: "center",
    //   flex: 1,
    //   renderCell: (data: any) =>
    //     data.row?.createdBy ? (
    //       <Chip
    //         label={data.row?.createdBy}
    //         sx={{
    //           textTransform: "uppercase",
    //         }}
    //       />
    //     ) : (
    //       "-"
    //     ),
    // },
    // {
    //   headerName: "Action",
    //   field: "action",
    //   width: 70,
    //   minWidth: 60,
    //   // flex: 1,
    //   headerAlign: "center",
    //   align: "center",

    //   renderCell: (data: any) => (
    //     <>
    //       <IconButton
    //         sx={{ fontSize: "large" }}
    //         color="primary"
    //         onClick={() =>
    //           navigate({
    //             search: `?employeeDialog=${data.id}`,
    //           })
    //         }
    //         // disabled={!checkAccess(defaultPermissions.EMPLOYEES.FULL)}
    //       >
    //         <FiEdit2 />
    //       </IconButton>
    //     </>
    //   ),
    // },
  ];
};

export default EmployeeColumn;
