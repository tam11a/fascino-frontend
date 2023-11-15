// import defaultPermissions from "@/utilities/defaultPermissions";
import useAreYouSure from "@/hooks/useAreYouSure";
import { useReturnStitchedItem } from "@/queries/item";
import { IDataTable } from "@/types";
import handleResponse from "@/utilities/handleResponse";
import { message } from "@components/antd/message";
import { Icon } from "@iconify/react";
import { Chip, IconButton } from "@mui/material";
import { GridColumns } from "@mui/x-data-grid";
import moment from "moment";
// import { checkAccess } from "@tam11a/react-use-access";
import { FiEdit2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ItemColumn = (): GridColumns<IDataTable> => {
  const navigate = useNavigate();

  const { mutateAsync: returnStitchedItem } = useReturnStitchedItem();

  const { contextHolder: closeContextHolder, open: openClose } = useAreYouSure({
    title: "Receive Stitched Item?",
    okText: "Yes",
    cancelText: "Cancel",
  });

  const onReceive = async (iid: string) => {
    message.open({
      type: "loading",
      content: "Receiving Stitched Item..",
      duration: 0,
    });
    const res = await handleResponse(() => returnStitchedItem(iid), [200]);
    message.destroy();
    if (res.status) {
      message.success("Item received successfully!");
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
      width: 140,
      // flex: 1,
      sortable: false,
      hide: false,
    },
    {
      headerName: "Product Name",
      headerAlign: "center",
      field: "prodName",
      align: "center",
      width: 150,
      minWidth: 130,
      flex: 1,
      renderCell: (data: any) =>
        data.row?.product ? <Chip label={data.row?.product?.name} /> : "-",
    },
    {
      headerName: "Branch",
      headerAlign: "center",
      field: "branch",
      align: "center",
      width: 150,
      minWidth: 130,
      flex: 1,
      renderCell: (data: any) =>
        data.row?.branch ? <Chip label={data.row?.branch?.name} /> : "-",
    },
    {
      headerName: "Stitch Fee",
      headerAlign: "center",
      field: "stitchFee",
      align: "center",
      width: 150,
      minWidth: 130,
      flex: 1,
      renderCell: (data: any) =>
        data.row?.stitch ? data.row?.stitch?.fee : "-",
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
      headerName: "Created At",
      headerAlign: "center",
      field: "createdAt",
      align: "center",
      width: 150,
      minWidth: 130,
      flex: 1,
      renderCell: (data: any) =>
        data.row?.stitch ? (
          <Chip label={moment(data.row?.stitch?.createdAt).format("LL")} />
        ) : (
          "-"
        ),
    },
    {
      headerName: "Recieved At",
      headerAlign: "center",
      field: "recievedAt",
      align: "center",
      width: 150,
      minWidth: 130,
      flex: 1,
      renderCell: (data: any) =>
        data.row?.stitch?.receivedAt ? (
          <Chip label={moment(data.row?.stitch?.createdAt).format("LL")} />
        ) : (
          <IconButton
            sx={{ fontSize: "large" }}
            color="primary"
            onClick={() =>
              openClose(
                () => onReceive(data?.row?._id),
                <>
                  This item will be marked as received and will be back in
                  invemtory
                </>
              )
            }
          >
            <Icon icon="ph:key-return-duotone" className="text-xl" />
          </IconButton>
        ),
    },
    {
      headerName: "Action",
      field: "action",
      width: 80,
      minWidth: 70,
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
          {closeContextHolder}
        </>
      ),
    },
  ];
};

export default ItemColumn;
