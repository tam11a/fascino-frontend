// import defaultPermissions from "@/utilities/defaultPermissions";
import { Icon } from "@iconify/react";
import { Chip, IconButton } from "@mui/material";
import { GridColumns } from "@mui/x-data-grid";
import { IDataTable } from "@pages/Employees/types";
import { FiEdit2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ShipmentColumn = (): GridColumns<IDataTable> => {
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
      headerName: "S.Name",
      headerAlign: "center",
      field: "name",
      align: "center",
      width: 250,
      minWidth: 200,
      flex: 1,
      renderCell: (data: any) => data.row?.supplier?.name,
    },
    {
      headerName: "S.Phone",
      headerAlign: "center",
      field: "phone",
      align: "center",
      width: 250,
      minWidth: 200,
      flex: 1,
      renderCell: (data: any) => data.row?.supplier?.phone,
    },
    {
      headerName: "S.Email",
      headerAlign: "center",
      field: "email",
      align: "center",
      width: 250,
      minWidth: 200,
      flex: 1,
      renderCell: (data: any) =>
        data.row?.supplier?.email ? data.row?.supplier?.email : "-",
    },
    {
      headerName: "Quantity",
      headerAlign: "center",
      field: "quantity",
      align: "center",
      width: 150,
      minWidth: 150,
      flex: 1,
    },
    {
      headerName: "Weight(gm)",
      headerAlign: "center",
      field: "weight",
      align: "center",
      width: 180,
      minWidth: 150,
    },
    {
      headerName: "Buying Price",
      headerAlign: "center",
      field: "buyingPrice",
      align: "center",
      width: 150,
      minWidth: 150,
      flex: 1,
    },
    {
      headerName: "Selling Price",
      headerAlign: "center",
      field: "sellPrice",
      align: "center",
      width: 150,
      minWidth: 150,
      flex: 1,
    },
    {
      headerName: "Weight Cost",
      headerAlign: "center",
      field: "weightCost",
      align: "center",
      width: 150,
      minWidth: 150,
      flex: 1,
    },
    {
      headerName: "Supplier Commision",
      headerAlign: "center",
      field: "supplierCommision",
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
    // {
    //   headerName: "Updated By",
    //   field: "updatedBy",
    //   width: 180,
    //   minWidth: 150,
    //   flex: 1,
    //   headerAlign: "center",
    //   align: "center",
    //   renderCell: (data: any) =>
    //     data.row?.updatedBy?.userName ? (
    //       <Chip
    //         label={data.row?.updatedBy?.userName}
    //         // sx={{
    //         //   textTransform: "uppercase",
    //         // }}
    //       />
    //     ) : (
    //       "-"
    //     ),
    // },
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
            onClick={() => navigate(`/app/shipment/${data.row?._id}`)}
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

export default ShipmentColumn;
