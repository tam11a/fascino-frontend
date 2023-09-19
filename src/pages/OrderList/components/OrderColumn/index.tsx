// import defaultPermissions from "@/utilities/defaultPermissions";
import { IDataTable } from "@/types";
import { Chip, IconButton, Typography } from "@mui/material";
import { GridColumns } from "@mui/x-data-grid";
import moment from "moment";
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
      width: 200,
      minWidth: 180,
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
      width: 250,
      minWidth: 150,
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
      headerName: "Branch",
      headerAlign: "center",
      field: "branch",
      align: "center",
      width: 200,
      minWidth: 180,
      renderCell: (data: any) =>
        data.row?.branch?.name ? (
          <Typography>{data.row?.branch?.name}</Typography>
        ) : (
          "-"
        ),
    },
    {
      headerName: "Salesman",
      headerAlign: "center",
      field: "salesman",
      align: "center",
      width: 200,
      minWidth: 180,
      renderCell: (data: any) =>
        data.row?.salesman?.fullName ? (
          <Typography>{data.row?.salesman?.fullName}</Typography>
        ) : (
          "-"
        ),
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
      headerName: "MFS",
      headerAlign: "center",
      field: "mfs",
      align: "center",
      flex: 1,
      width: 100,
      minWidth: 80,
    },

    {
      headerName: "Paid",
      headerAlign: "center",
      field: "paid",
      align: "center",
      flex: 1,
      width: 100,
      minWidth: 80,
      renderCell: (data: any) => {
        let totalAmount = 0;

        data?.row?.transaction.forEach((total: any) => {
          totalAmount += total.amount;
        });
        return totalAmount;
      },
    },
    {
      headerName: "Due",
      headerAlign: "center",
      field: "due",
      align: "center",
      flex: 1,
      width: 100,
      minWidth: 80,
      renderCell: (data: any) => {
        let totalAmount = 0;

        data?.row?.transaction.forEach((total: any) => {
          totalAmount += total.amount;
        });
        const due = data?.row?.total - data?.row?.discount - totalAmount;
        return due > 0 ? (
          <span className="font-bold text-red-600">{due}</span>
        ) : (
          0
        );
      },
    },
    {
      headerName: "Discount",
      headerAlign: "center",
      field: "discount",
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
      headerName: "Invoice Id",
      headerAlign: "center",
      field: "invoice",
      align: "center",
      width: 240,
      minWidth: 200,
    },
    {
      headerName: "Created At",
      field: "createdAt",
      headerAlign: "center",
      align: "center",
      width: 150,
      minWidth: 150,
      renderCell: (data: any) =>
        data.row?.createdAt ? (
          <>{moment(data.row?.createdAt).format("lll")}</>
        ) : (
          "-"
        ),
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

export default OrderColumn;
