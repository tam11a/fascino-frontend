// import defaultPermissions from "@/utilities/defaultPermissions";
import { Chip, IconButton, Typography } from "@mui/material";
import { GridColumns } from "@mui/x-data-grid";
import { IDataTable } from "@pages/Employees/Types";
// import { checkAccess } from "@tam11a/react-use-access";
// import moment from "moment";
import { FiEdit2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const OrderColumn = (): GridColumns<IDataTable> => {
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
      headerName: "Customer Name",
      headerAlign: "center",
      field: "name",
      align: "center",
      width: 150,
      minWidth: 150,
      flex: 1,
      renderCell: (data: any) =>
        data.row?.customer?.name ? (
          <Typography>{data.row?.customer?.name}</Typography>
        ) : (
          "-"
        ),
    },
    {
      headerName: "Customer Address",
      headerAlign: "center",
      field: "address",
      align: "center",
      width: 150,
      minWidth: 150,
      flex: 1,
      renderCell: (data: any) =>
        data.row?.customer?.address ? (
          <Typography>{data.row?.customer?.address}</Typography>
        ) : (
          "-"
        ),
    },
    {
      headerName: "Customer Phone",
      headerAlign: "center",
      field: "phone",
      align: "center",
      width: 160,
      minWidth: 150,
      renderCell: (data: any) =>
        data.row?.customer?.phone ? (
          <Typography>{data.row?.customer?.phone}</Typography>
        ) : (
          "-"
        ),
    },
    {
      headerName: "Amount",
      headerAlign: "center",
      field: "amount",
      align: "center",
      flex: 1,
      width: 160,
      minWidth: 150,
      renderCell: (data: any) =>
        data.row?.transaction?.amount ? (
          <Typography>{data.row?.transaction?.amount}</Typography>
        ) : (
          "-"
        ),
    },
    {
      headerName: "Type",
      headerAlign: "center",
      field: "type",
      align: "center",
      flex: 1,
      width: 160,
      minWidth: 150,
    },
    {
      headerName: "Invoice Id",
      headerAlign: "center",
      field: "invoice",
      align: "center",
      width: 200,
      minWidth: 200,
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
      headerName: "Updated By",
      field: "updatedBy",
      width: 150,
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (data: any) =>
        data.row?.updatedBy?.userName ? (
          <Chip label={data.row?.updatedBy?.userName} />
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
            onClick={() => navigate(`/app/order/${data.row?._id}`)}
            // disabled={!checkAccess(defaultPermissions.EMPLOYEES.FULL)}
          >
            <FiEdit2 />
          </IconButton>
        </>
      ),
    },
  ];
};

export default OrderColumn;
