// import defaultPermissions from "@/utilities/defaultPermissions";
import { useToggleBranch } from "@/queries/branch";
import { IDataTable } from "@/types";
import handleResponse from "@/utilities/handleResponse";
import { Chip, IconButton } from "@mui/material";
import { GridColumns } from "@mui/x-data-grid";
import { Switch, message } from "antd";
// import { checkAccess } from "@tam11a/react-use-access";
// import moment from "moment";
import { FiEdit2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const BranchColumn = (): GridColumns<IDataTable> => {
  const navigate = useNavigate();

  const { mutateAsync: toggleBranch } = useToggleBranch();

  //   const updateBranch = async (id:any) => {
  // 	const res = await handleResponse(()=> toggleBranch(id));
  // 	if (res.status)
  //   }

  const onSubmit = async (id: any) => {
    message.open({
      type: "loading",
      content: "Updating Branch Status..",
      duration: 0,
    });
    const res = await handleResponse(() => toggleBranch(id), [200]);
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
      headerName: "Address",
      headerAlign: "center",
      field: "address",
      align: "center",
      width: 150,
      minWidth: 150,
      flex: 1,
    },
    {
      headerName: "Phone",
      headerAlign: "center",
      field: "phone",
      align: "center",
      flex: 1,
      width: 160,
      minWidth: 150,
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
            onClick={() => navigate(`/app/branch/${data.row?._id}`)}
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

export default BranchColumn;
