// import defaultPermissions from "@/utilities/defaultPermissions";
import { IDataTable } from "@/types";
import { Icon } from "@iconify/react";
import { Chip, IconButton } from "@mui/material";
import { GridColumns } from "@mui/x-data-grid";
import { Tag } from "antd";
import moment from "moment";
// import { checkAccess } from "@tam11a/react-use-access";
// import moment from "moment";
import { FiEdit2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ItemColumn = (): GridColumns<IDataTable> => {
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
      headerName: "Product",
      headerAlign: "center",
      field: "product",
      align: "center",
      width: 250,
      minWidth: 150,
      flex: 1,
      renderCell: (data: any) =>
        data.row?.product ? data.row?.product?.name : "-",
    },
    {
      headerName: "Branch",
      headerAlign: "center",
      field: "branch",
      align: "center",
      width: 150,
      minWidth: 150,
      flex: 1,
      renderCell: (data: any) =>
        data.row?.branch ? <Chip label={data.row?.branch?.name} /> : "-",
    },
    {
      headerName: "Supplier",
      headerAlign: "center",
      field: "supplier",
      align: "center",
      width: 200,
      minWidth: 180,
      flex: 1,
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
      headerName: "Stitch Size",
      headerAlign: "center",
      field: "stitchSize",
      align: "center",
      width: 150,
      minWidth: 130,
      flex: 1,
      renderCell: (data: any) =>
        data.row?.stitch ? data.row?.stitch?.size : "-",
    },
    {
      headerName: "Status",
      field: "orderLine",
      width: 120,
      minWidth: 100,
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: (data: any) =>
        data.row?.orderLine ? (
          <Tag color="red">Sold</Tag>
        ) : (
          <Tag color="green">Available</Tag>
        ),
    },
    {
      headerName: "Action",
      field: "action",
      width: 80,
      minWidth: 60,
      flex: 1,
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

export default ItemColumn;
