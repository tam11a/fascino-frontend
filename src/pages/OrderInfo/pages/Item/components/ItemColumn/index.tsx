// import defaultPermissions from "@/utilities/defaultPermissions";
import useAreYouSure from "@/hooks/useAreYouSure";
import { useReturnItem } from "@/queries/item";
import { IDataTable } from "@/types";
import handleResponse from "@/utilities/handleResponse";
import { message } from "@components/antd/message";
import { Icon } from "@iconify/react";
import { Chip, IconButton } from "@mui/material";
import { GridColumns } from "@mui/x-data-grid";
import { Tag } from "antd";
// import { checkAccess } from "@tam11a/react-use-access";
// import moment from "moment";
import { FiEdit2 } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";

const ItemColumn = (): GridColumns<IDataTable> => {
	const navigate = useNavigate();
	const { oid } = useParams();

	const { mutateAsync: returnItem } = useReturnItem();

	const { contextHolder: closeContextHolder, open: openClose } = useAreYouSure({
		title: "Returning Product Item?",
		okText: "Ok, Return",
		cancelText: "Cancel",
	});

	const onSubmit = async (rid: string) => {
		message.open({
			type: "loading",
			content: "Returning Product Item..",
			duration: 0,
		});
		const res = await handleResponse(() => returnItem(rid), [200]);
		message.destroy();
		if (res.status) {
			message.success("Item returned successfully!");
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
			hide: false,
		},

		{
			headerName: "Product",
			headerAlign: "center",
			field: "product",
			align: "center",
			width: 200,
			minWidth: 170,
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
			headerName: "Branch",
			headerAlign: "center",
			field: "branch",
			align: "center",
			width: 150,
			minWidth: 120,
			flex: 1,
			renderCell: (data: any) =>
				data.row?.branch ? (
					<Chip
						label={data.row?.branch?.name}
						onClick={() => navigate(`/app/branch/${data.row?.branch?._id}`)}
					/>
				) : (
					"-"
				),
		},
		{
			headerName: "Stitch",
			field: "stitch",
			width: 100,
			minWidth: 80,
			headerAlign: "center",
			align: "center",
			renderCell: (data: any) =>
				!!data.row?.stitch ? (
					<Icon
						icon="game-icons:sewing-machine"
						className="text-xl"
						color="#36b336"
					/>
				) : (
					<Icon
						icon="game-icons:sewing-machine"
						className="text-xl"
					/>
				),
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
					>
						<FiEdit2 />
					</IconButton>
					<IconButton
						sx={{ fontSize: "large" }}
						color="error"
						onClick={() =>
							openClose(
								() => onSubmit(data?.row?._id),
								<>
									Returning means that you received the product back in
									inventory
								</>
							)
						}
						disabled={
							!data?.row?.orderLine || data?.row?.orderLine?.order !== oid
						}
					>
						<Icon icon="tabler:truck-return" />
					</IconButton>
					{closeContextHolder}
				</>
			),
		},
	];
};

export default ItemColumn;
