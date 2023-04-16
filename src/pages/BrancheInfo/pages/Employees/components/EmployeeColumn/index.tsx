// import defaultPermissions from "@/utilities/defaultPermissions";
import { Icon } from "@iconify/react";
import { Chip, IconButton } from "@mui/material";
import { GridColumns } from "@mui/x-data-grid";
import { IDataTable } from "@/pages/Employees/types";
import moment from "moment";
// import { checkAccess } from "@tam11a/react-use-access";
// import moment from "moment";
import { FiEdit2 } from "react-icons/fi";
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
      width: 150,
      minWidth: 120,
      flex: 1,
      renderCell: (data: any) => data.row?.admin?.email,
    },
    {
      headerName: "Phone",
      headerAlign: "center",
      field: "phone",
      align: "center",
      width: 150,
      minWidth: 120,
      flex: 1,
      renderCell: (data: any) => data.row?.admin?.phone,
    },
    {
      headerName: "Gender",
      headerAlign: "center",
      field: "gender",
      align: "center",
      width: 150,
      minWidth: 120,
      flex: 1,
      renderCell: (data: any) => data.row?.admin?.phone,
    },
    {
      headerName: "Supplier",
      headerAlign: "center",
      field: "supplier",
      align: "center",
      width: 180,
      minWidth: 150,
      renderCell: (data: any) =>
        data.row?.shipment?.supplier ? (
          <Chip label={data.row?.shipment?.supplier?.name} />
        ) : (
          "-"
        ),
    },
    {
      headerName: "Shipping Date",
      field: "shippingDate",
      width: 170,
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: (data: any) =>
        data.row?.shipment
          ? moment(data.row?.shipment?.createdAt).format("LL")
          : "-",
    },
    {
      headerName: "Stitch",
      field: "stitch",
      width: 100,
      minWidth: 80,
      headerAlign: "center",
      align: "center",
      renderCell: (data: any) =>
        !!data.row?.stitch ? (
          <Icon
            icon="game-icons:sewing-machine"
            className="text-xl"
            color="#36b336"
          />
        ) : (
          <Icon icon="game-icons:sewing-machine" className="text-xl" />
        ),
    },
    {
      headerName: "Action",
      field: "action",
      width: 80,
      minWidth: 60,
      headerAlign: "center",
      align: "center",
      renderCell: (data: any) => (
        <>
          <IconButton
            sx={{ fontSize: "large" }}
            color="primary"
            onClick={() => navigate(`/app/item/${data.row?._id}`)}
            // disabled={!checkAccess(defaultPermissions.EMPLOYEES.FULL)}
          >
            <FiEdit2 />
          </IconButton>
          <IconButton
            sx={{ fontSize: "large" }}
            color="error"
            // onClick={() =>
            //   open(<>Are you sure you want to delete this employee?</>)
            // }
            // disabled={!checkAccess(defaultPermissions.EMPLOYEES.FULL)}
            disabled
          >
            <Icon icon="ci:trash-full" />
          </IconButton>
        </>
      ),
    },
  ];
};

export default EmployeeColumn;
