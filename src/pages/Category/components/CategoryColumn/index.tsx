// import defaultPermissions from "@/utilities/defaultPermissions";
import { useToggleCategory } from "@/queries/category";
import { IDataTable } from "@/types";
import handleResponse from "@/utilities/handleResponse";
import { Chip, IconButton, Typography } from "@mui/material";
import { GridColumns } from "@mui/x-data-grid";
import { Switch, message } from "antd";
// import { checkAccess } from "@tam11a/react-use-access";
// import moment from "moment";
import { FiEdit2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const CategoryColumn = (): GridColumns<IDataTable> => {
  const navigate = useNavigate();

  const { mutateAsync: toggleCategory } = useToggleCategory();

  const onSubmit = async (id: any) => {
    message.open({
      type: "loading",
      content: "Updating Branch Status..",
      duration: 0,
    });
    const res = await handleResponse(() => toggleCategory(id), [200]);
    message.destroy();
    if (res.status) {
      message.success(res.message);
    } else {
      message.error(res.message);
    }
  };

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
      width: 150,
      minWidth: 150,
      flex: 1,
    },
    {
      headerName: "Subcategory No",
      headerAlign: "center",
      field: "totalSubcategory",
      width: 250,
      minWidth: 250,
      align: "center",
      renderCell: (data: any) =>
        data.row?.totalSubcategory ? (
          <Typography>{data.row?.totalSubcategory}</Typography>
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
          <Chip
            label={data.row?.createdBy?.userName}
            // sx={{
            //   textTransform: "uppercase",
            // }}
          />
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
      width: 100,
      minWidth: 80,
      // flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (data: any) => (
        <>
          <IconButton
            sx={{ fontSize: "large" }}
            color="primary"
            onClick={() => navigate(`/app/category/${data.row?._id}`)}
            // disabled={!checkAccess(defaultPermissions.EMPLOYEES.FULL)}
          >
            <FiEdit2 />
          </IconButton>
          <Switch
            checked={data?.row?.isActive}
            onClick={() => onSubmit(data?.row?._id)}
            size="small"
          />
        </>
      ),
    },
  ];
};

export default CategoryColumn;
