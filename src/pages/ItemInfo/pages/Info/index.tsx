import React from "react";
import { Container } from "@mui/system";
import { Descriptions } from "antd";
import { useParams } from "react-router-dom";
// import { useGetShipmentById } from "@/queries/shipment";
import moment from "moment";
import { useGetItemById, useReturnStitchedItem } from "@/queries/item";
// import Barcode from "react-barcode";
import {
	Button,
	IconButton,
	// IconButton
} from "@mui/material";
// import Iconify from "@components/iconify";
// import { useReactToPrint } from "react-to-print";
import { useGetEmployeesById } from "@/queries/employees";
import useAreYouSure from "@/hooks/useAreYouSure";
import handleResponse from "@/utilities/handleResponse";
import { message } from "@components/antd/message";
import { Icon } from "@iconify/react";
import { useReactToPrint } from "react-to-print";
import Iconify from "@components/iconify";
import Barcode from "react-jsbarcode";

const Info: React.FC = ({}) => {
	const { iid } = useParams();

	const { data: itemData } = useGetItemById(iid);
	const { data: employeeData } = useGetEmployeesById(
		itemData?.data?.data?.stitch?.receivedBy
	);

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

	const printRef = React.useRef(null);

	const reactToPrintContent = React.useCallback(() => {
		return printRef.current;
	}, [printRef.current]);

	const handlePrint = useReactToPrint({
		content: reactToPrintContent,
		documentTitle: "item-" + iid || "",
		removeAfterPrint: true,
		pageStyle: `
	  @page {
	    // size: 2.17in 0.71in;
	    margin: 0in 0.4in 0.67in 0.85in;
	  }

	  @media all {
	    .pageBreak {
	      display: none
	    }
	  }

	  @media print {
	    .pageBreak {
	      page-break-before: always
	    }
	  }
	  `,
	});

	return (
		<>
			{closeContextHolder}
			<Container>
				<Descriptions
					bordered
					column={{ xs: 1, sm: 1, md: 2 }}
				>
					<Descriptions.Item
						label={
							<>
								<IconButton onClick={() => handlePrint()}>
									<Iconify
										icon={"material-symbols:print-add-outline-rounded"}
									/>
								</IconButton>
							</>
						}
						span={2}
					>
						<div ref={printRef}>
							<Barcode
								value={iid || ""}
								options={{
									text: `${iid}${
										itemData?.data?.data?.stitch
											? `-${itemData?.data?.data?.stitch?.size}`
											: ""
									}`,
									width: 1,
									fontOptions: "bold",
									format: "CODE128",
									fontSize: 8,
									height: 50,
								}}
							/>
						</div>
					</Descriptions.Item>
					<Descriptions.Item label="Product">
						<b>Name:</b> {itemData?.data?.data?.product?.name}
						<br />
						<b>Category:</b> {itemData?.data?.data?.product?.category?.name}
						<br />
						<b>Subcategory:</b>{" "}
						{itemData?.data?.data?.product?.subcategory?.name}
						<br />
						<b>Created By:</b>{" "}
						{itemData?.data?.data?.product?.createdBy?.userName}
						<br />
						<b>Updated By:</b>
						<br />
						<b>Created At:</b>{" "}
						{moment(itemData?.data?.data?.product?.updatedAt).format(
							"MMMM Do YYYY"
						)}
						<br />
						<b>Updated At:</b>{" "}
						{moment(itemData?.data?.data?.product?.updatedAt).format(
							"MMMM Do YYYY"
						)}
					</Descriptions.Item>
					<Descriptions.Item label="Shipment">
						<b>Supplier:</b> {itemData?.data?.data?.shipment?.supplier?.name}
						<br />
						<b>Email:</b> {itemData?.data?.data?.shipment?.supplier?.email}
						<br />
						<b>Phone:</b> {itemData?.data?.data?.shipment?.supplier?.phone}
						<br />
						<b>Address:</b> {itemData?.data?.data?.shipment?.supplier?.address}
						<br />
						<b>Created By: </b>
						{itemData?.data?.data?.shipment?.supplier?.createdBy?.fullName}
						<br />
						<b>Updated By: </b>
						{itemData?.data?.data?.shipment?.supplier?.updatedBy?.fullName}
						<br />
						<b>Created At: </b>
						{moment(itemData?.data?.data?.shipment?.supplier?.createdAt).format(
							"LL"
						)}
						<br />
						<b>Updated At: </b>
						{moment(itemData?.data?.data?.shipment?.supplier?.updatedAt).format(
							"LL"
						)}
					</Descriptions.Item>

					<Descriptions.Item label="Branch">
						<b>Name:</b> {itemData?.data?.data?.branch?.name}
						<br />
						<b>Address:</b> {itemData?.data?.data?.branch?.address}
						<br />
						<b>Phone:</b> {itemData?.data?.data?.branch?.phone}
						<br />
					</Descriptions.Item>

					{!!itemData?.data.data.stitch ? (
						<Descriptions.Item label="Stitch Details">
							<b>Tailor Name:</b> {itemData?.data?.data?.stitch?.tailor?.name}
							<br />
							<b>Tailor Address:</b>{" "}
							{itemData?.data?.data?.stitch?.tailor?.address}
							<br />
							<b>Tailor Owner:</b>{" "}
							{itemData?.data?.data?.stitch?.tailor?.ownerName}
							<br />
							<b>Tailor Contact:</b>{" "}
							{itemData?.data?.data?.stitch?.tailor?.phone}
							<br />
							<b>Stitch Fee:</b> {itemData?.data?.data?.stitch?.fee}
							<br />
							<b>Stitch Size:</b> {itemData?.data?.data?.stitch?.size}
							<br />
							<b>Created At:</b>{" "}
							{moment(itemData?.data?.data?.stitch?.createdAt).format("LL")}
							<br />
							{itemData?.data?.data?.stitch?.receivedAt ? (
								<>
									<b>Received At:</b>{" "}
									{moment(itemData?.data?.data?.stitch?.receivedAt).format(
										"LL"
									)}
									<br />
									<b>Received By:</b> {employeeData?.data?.data?.fullName}
									<br />
									<b>Receiver Role:</b> {employeeData?.data?.data?.role?.name}
								</>
							) : (
								<>
									<b>Received: </b>
									<Button
										sx={{ fontSize: "14px" }}
										size="small"
										color="primary"
										onClick={() =>
											openClose(
												() => onReceive(itemData?.data?.data?._id),
												<>
													This item will be marked as received and will be back
													in invemtory
												</>
											)
										}
										endIcon={
											<Icon
												icon="ph:key-return-duotone"
												className="text-xl"
											/>
										}
									>
										Receive Now
									</Button>
								</>
							)}
						</Descriptions.Item>
					) : (
						""
					)}
				</Descriptions>
			</Container>
		</>
	);
};

export default Info;
