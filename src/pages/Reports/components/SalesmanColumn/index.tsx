// import defaultPermissions from "@/utilities/defaultPermissions";
import { IDataTable } from "@/types";
import { Typography } from "@mui/material";
import { GridColumns } from "@mui/x-data-grid";
// import moment from "moment";
// import { checkAccess } from "@tam11a/react-use-access";
// import moment from "moment";
// import { FiEdit2 } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";

const SalesmanColumn = (): GridColumns<IDataTable> => {
  // const navigate = useNavigate();
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
      headerName: "Salesman Name",
      headerAlign: "center",
      field: "name",
      align: "center",
      // width: 200,
      // minWidth: 180,
      flex: 1,
      renderCell: (data: any) =>
        data.row?.salesmanData?.[0]?.firstName
          ? `${data.row?.salesmanData?.[0]?.firstName} ${data.row?.salesmanData?.[0]?.lastName}`
          : "-",
    },
    {
      headerName: "Sales Amount",
      headerAlign: "center",
      field: "address",
      align: "center",
      flex: 1,
      // width: 250,
      // minWidth: 150,
      renderCell: (data: any) =>
        data?.row?.totalSalesAmount ? (
          <Typography>{data?.row?.totalSalesAmount}</Typography>
        ) : (
          "-"
        ),
    },
    {
      headerName: "Sale Quantity",
      headerAlign: "center",
      field: "phone",
      align: "center",
      flex: 1,
      // width: 160,
      // minWidth: 150,
      renderCell: (data: any) =>
        data?.row?.totalSalesQuantity ? (
          <Typography>{data?.row?.totalSalesQuantity}</Typography>
        ) : (
          "-"
        ),
    },
  ];
};

export default SalesmanColumn;
