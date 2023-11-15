// import defaultPermissions from "@/utilities/defaultPermissions";
import { IDataTable } from "@/types";

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
      width: 150,
      minWidth: 120,
      flex: 1,
      renderCell: (data: any) =>
        data.row?.product ? (
          <Chip
            label={data.row?.product?.name}
            onClick={() => navigate(`/app/product/${data.row?.product._id}`)}
          />
        ) : (
          "-"
        ),
    },
    {
      headerName: "Category",
      headerAlign: "center",
      field: "category",
      align: "center",
      width: 150,
      minWidth: 120,
      flex: 1,
      renderCell: (data: any) =>
        data.row?.product?.category ? (
          <Chip
            label={data.row?.product?.category?.name}
            onClick={() =>
              navigate(`/app/product/${data.row?.product?.category?._id}`)
            }
          />
        ) : (
          "-"
        ),
    },
    {
      headerName: "Subcategory",
      headerAlign: "center",
      field: "subcategory",
      align: "center",
      width: 150,
      minWidth: 120,
      flex: 1,
      renderCell: (data: any) =>
        data.row?.product?.subcategory ? (
          <Chip label={data.row?.product?.subcategory?.name} />
        ) : (
          "-"
        ),
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
      headerName: "Stitch Size",
      field: "stitch",
      width: 100,
      minWidth: 80,
      headerAlign: "center",
      align: "center",
      renderCell: (data: any) =>
        data.row?.stitch ? data.row?.stitch?.size : "-",
    },
    {
      headerName: "Status",
      field: "orderline",
      width: 120,
      minWidth: 100,
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: (data: any) =>
        data.row?.orderline ? (
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
        </>
      ),
    },
  ];
};

export default ItemColumn;
