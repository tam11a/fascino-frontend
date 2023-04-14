// import defaultPermissions from "@/utilities/defaultPermissions";
// import { useToggleProducts } from "@/queries/products";
import { IDataTable } from "@/types";
// import handleResponse from "@/utilities/handleResponse";
// import { message } from "@components/antd/message";
import { Chip, IconButton } from "@mui/material";
import { GridColumns } from "@mui/x-data-grid";
// import { Switch } from "antd";
// import { checkAccess } from "@tam11a/react-use-access";
// import moment from "moment";
import { FiEdit2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ProductColumn = (): GridColumns<IDataTable> => {
  const navigate = useNavigate();

  //   const { mutateAsync: toggleProducts } = useToggleProducts();

  //   const onSubmit = async (id: any) => {
  //     message.open({
  //       type: "loading",
  //       content: "Updating Products Status..",
  //       duration: 0,
  //     });
  //     const res = await handleResponse(() => toggleProducts(id), [200]);
  //     message.destroy();
  //     if (res.status) {
  //       message.success(res.message);
  //     } else {
  //       message.error(res.message);
  //     }
  //   };
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
      headerName: "Price",
      headerAlign: "center",
      field: "price",
      align: "center",
      width: 150,
      minWidth: 150,
      flex: 1,
    },
    {
      headerName: "Category",
      headerAlign: "center",
      field: "category",
      align: "center",
      width: 150,
      minWidth: 150,
      flex: 1,
      renderCell: (data: any) =>
        data.row?.category?.name ? (
          <Chip label={data.row?.category?.name} />
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
      minWidth: 150,
      flex: 1,
      renderCell: (data: any) =>
        data.row?.subcategory?.name ? (
          <Chip label={data.row?.subcategory?.name} />
        ) : (
          "-"
        ),
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
            onClick={() => navigate(`/app/product/${data.row?._id}`)}
            // disabled={!checkAccess(defaultPermissions.EMPLOYEES.FULL)}
          >
            <FiEdit2 />
          </IconButton>

          {/* <Switch
            checked={data?.row?.isActive}
            onClick={() => onSubmit(data?.row?._id)}
            size="small"
          /> */}
        </>
      ),
    },
  ];
};

export default ProductColumn;
