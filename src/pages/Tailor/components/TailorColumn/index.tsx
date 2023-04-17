// import defaultPermissions from "@/utilities/defaultPermissions";
import { IDataTable } from "@/types";
import { Icon } from "@iconify/react";
import { Chip, IconButton } from "@mui/material";
import { GridColumns } from "@mui/x-data-grid";
// import { checkAccess } from "@tam11a/react-use-access";
// import moment from "moment";
import { FiEdit2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const TailorColumn = (): GridColumns<IDataTable> => {
  const navigate = useNavigate();

  return [
    {
      headerName: "ID",
      headerAlign: "center",
      field: "_id",
      align: "center",
      width: 200,
      // flex: 1,
      sortable: false,
      hide: true,
    },
    {
      headerName: "Name",
      headerAlign: "center",
      field: "name",
      align: "center",
      width: 250,
      minWidth: 200,
      flex: 1,
    },
    {
      headerName: "Owner",
      headerAlign: "center",
      field: "ownerName",
      align: "center",
      width: 150,
      minWidth: 150,
      flex: 1,
    },
    {
      headerName: "Address",
      headerAlign: "center",
      field: "address",
      align: "center",
      width: 250,
      minWidth: 150,
      flex: 1,
    },
    {
      headerName: "Phone",
      headerAlign: "center",
      field: "phone",
      align: "center",
      width: 250,
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
      width: 180,
      minWidth: 150,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (data: any) =>
        data.row?.updatedBy?.userName ? (
          <Chip
            label={data.row?.updatedBy?.userName}
            // sx={{
            //   textTransform: "uppercase",
            // }}
          />
        ) : (
          "-"
        ),
    },
    {
      headerName: "Action",
      field: "action",
      width: 80,
      minWidth: 80,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (data: any) => (
        <>
          <IconButton
            sx={{ fontSize: "large" }}
            color="primary"
            onClick={() => navigate(`/app/tailors/${data.row?._id}`)}
            // disabled={!checkAccess(defaultPermissions.EMPLOYEES.FULL)}
          >
            <FiEdit2 />
          </IconButton>
          <IconButton
            sx={{ fontSize: "large" }}
            color="error"
            disabled
            // onClick={() =>
            //   open(<>Are you sure you want to delete this employee?</>)
            // }
            // disabled={!checkAccess(defaultPermissions.EMPLOYEES.FULL)}
          >
            <Icon icon="ci:trash-full" />
          </IconButton>
        </>
      ),
    },
  ];
};

export default TailorColumn;
