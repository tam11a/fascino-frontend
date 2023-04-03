// import defaultPermissions from "@/utilities/defaultPermissions";
import { Chip } from "@mui/material";
import { GridColumns } from "@mui/x-data-grid";
import { IDataTable } from "@pages/Employees/Types";
// import { checkAccess } from "@tam11a/react-use-access";
// import moment from "moment";
// import { FiEdit2 } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";

const SubcategoryColumn = (): GridColumns<IDataTable> => {
  // const navigate = useNavigate();
  return [
    {
      headerName: "ID",
      headerAlign: "center",
      field: "_id",
      align: "center",
      width: 20,
      sortable: false,
      hide: true,
    },
    {
      headerName: "Name",
      headerAlign: "center",
      field: "name",
      align: "center",
      width: 150,
      minWidth: 150,
      flex: 1,
    },
    {
      headerName: "Created by",
      field: "createdBy",
      width: 170,
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: (data: any) =>
        data.row?.createdBy?.userName ? (
          <Chip label={data.row?.createdBy?.userName} />
        ) : (
          "-"
        ),
    },
    {
      headerName: "Updated By",
      field: "updatedBy",
      width: 220,
      minWidth: 150,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (data: any) =>
        data.row?.updatedBy?.userName ? (
          <Chip label={data.row?.updatedBy?.userName} />
        ) : (
          "-"
        ),
    },
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
    //         onClick={() => navigate(`/app/category/${data.row?._id}`)}
    //         // disabled={!checkAccess(defaultPermissions.EMPLOYEES.FULL)}
    //       >
    //         <FiEdit2 />
    //       </IconButton>
    //     </>
    //   ),
    // },
  ];
};

export default SubcategoryColumn;