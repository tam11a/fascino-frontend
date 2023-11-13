// import defaultPermissions from "@/utilities/defaultPermissions";
import { useToggleEmployee } from "@/queries/employees";
import { IDataTable } from "@/types";
import handleResponse from "@/utilities/handleResponse";
import { message } from "@components/antd/message";
import { Chip, IconButton } from "@mui/material";
import { GridColumns } from "@mui/x-data-grid";
import { Switch } from "antd";
// import { checkAccess } from "@tam11a/react-use-access";
// import moment from "moment";
import { FiEdit2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const EmployeeColumn = (): GridColumns<IDataTable> => {
  const navigate = useNavigate();

  const { mutateAsync: toggleEmployee } = useToggleEmployee();

  const onSubmit = async (id: any) => {
    message.open({
      type: "loading",
      content: "Updating Employee Status..",
      duration: 0,
    });
    const res = await handleResponse(() => toggleEmployee(id), [200]);
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
      field: "firstName",
      align: "center",
      width: 150,
      minWidth: 150,
      flex: 1,
      renderCell: (data: any) => `${data.row.firstName} ${data.row.lastName}`,
    },
    {
      headerName: "Role",
      headerAlign: "center",
      field: "role",
      align: "center",
      width: 150,
      minWidth: 150,
      flex: 1,
      renderCell: (data: any) =>
        data.row?.role?.name ? <Chip label={data.row?.role?.name} /> : "-",
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
      headerName: "Email",
      headerAlign: "center",
      field: "email",
      width: 250,
      minWidth: 250,
      flex: 1.5,
      align: "center",
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
      width: 100,
      minWidth: 80,
      // flex: 1,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (data: any) => (
        <>
          <IconButton
            sx={{ fontSize: "large" }}
            color="primary"
            onClick={() => navigate(`/app/employees/${data.row?._id}`)}
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

export default EmployeeColumn;
