// import defaultPermissions from "@/utilities/defaultPermissions";
import { Chip, IconButton } from "@mui/material";
import { GridColumns } from "@mui/x-data-grid";
// import { checkAccess } from "@tam11a/react-use-access";
// import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { message } from "@components/antd/message";
import handleResponse from "@/utilities/handleResponse";
import { usedeleteJunction } from "@/queries/branch";
import { IDataTable } from "@/types";

const EmployeeColumn = (): GridColumns<IDataTable> => {
  const navigate = useNavigate();

  const { mutateAsync: deleteJunction } = usedeleteJunction();

  const onDel = async (id: any) => {
    message.open({
      type: "loading",
      content: "Removing Employee from Branch..",
      duration: 0,
    });
    const res = await handleResponse(() => deleteJunction(id), [200]);
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
      width: 240,
      // flex: 1,
      sortable: false,
      hide: true,
    },

    {
      headerName: "Name",
      headerAlign: "center",
      field: "fullName",
      align: "center",
      width: 250,
      minWidth: 220,
      flex: 1,
      renderCell: (data: any) =>
        data.row?.admin ? (
          <Chip
            label={data.row?.admin?.fullName}
            onClick={() => navigate(`/app/employee/${data.row?.admin._id}`)}
          />
        ) : (
          "-"
        ),
    },
    {
      headerName: "Email",
      headerAlign: "center",
      field: "email",
      align: "center",
      width: 250,
      minWidth: 220,
      flex: 1,
      renderCell: (data: any) => data.row?.admin?.email,
    },
    {
      headerName: "Phone",
      headerAlign: "center",
      field: "phone",
      align: "center",
      width: 200,
      minWidth: 170,
      flex: 1,
      renderCell: (data: any) => data.row?.admin?.phone,
    },
    {
      headerName: "Gender",
      headerAlign: "center",
      field: "gender",
      align: "center",
      width: 120,
      minWidth: 100,
      flex: 1,
      renderCell: (data: any) => data.row?.admin?.gender,
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
            color="error"
            onClick={() => onDel(data?.row?._id)}
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

export default EmployeeColumn;
