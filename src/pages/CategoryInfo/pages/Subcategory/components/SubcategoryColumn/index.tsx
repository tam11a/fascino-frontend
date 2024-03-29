// import defaultPermissions from "@/utilities/defaultPermissions";
import { IDataTable } from "@/types";
import { Chip, IconButton } from "@mui/material";
import { GridColumns } from "@mui/x-data-grid";
import moment from "moment";
import { FiEdit2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const SubcategoryColumn = (): GridColumns<IDataTable> => {
  const navigate = useNavigate();

  // const { mutateAsync: toggleSubcategory } = useToggleSubcategory();

  // const onSubmit = async (id: any) => {
  //   message.open({
  //     type: "loading",
  //     content: "Updating Subcategory Status..",
  //     duration: 0,
  //   });
  //   const res = await handleResponse(() => toggleSubcategory(id), [200]);
  //   message.destroy();
  //   if (res.status) {
  //     message.success(res.message);
  //   } else {
  //     message.error(res.message);
  //   }
  // };
  return [
    {
      headerName: "ID",
      headerAlign: "center",
      field: "_id",
      align: "center",
      width: 20,
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
      headerName: "Total Products",
      headerAlign: "center",
      field: "totalProducts",
      align: "center",
      width: 150,
      minWidth: 150,
      flex: 1,
    },
    {
      headerName: "Created At",
      field: "createdAt",
      width: 170,
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: (data: any) =>
        data.row?.createdAt ? moment(data.row?.createdAt).format("LL") : "-",
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
      width: 220,
      minWidth: 150,
      flex: 1,
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
      width: 80,
      minWidth: 60,
      // flex: 1,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (data: any) => (
        <>
          <IconButton
            sx={{ fontSize: "large" }}
            color="primary"
            onClick={() => navigate(`/app/subcategory/${data.row?._id}`)}
            // disabled={!checkAccess(defaultPermissions.EMPLOYEES.FULL)}
          >
            <FiEdit2 />
          </IconButton>
        </>
      ),
    },
  ];
};

export default SubcategoryColumn;
