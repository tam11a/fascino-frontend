import { Container } from "@mui/system";
import { Descriptions } from "antd";
import React from "react";
import { useParams } from "react-router-dom";
import { useGetOrderById } from "@/queries/order";
import moment from "moment";
import { Grid, Typography } from "@mui/material";

const Info: React.FC = () => {
	const { oid } = useParams();
	const { data: orderDataById } = useGetOrderById(oid);
	console.log(orderDataById);
	return (
		<>
			<Container>
				{" "}
				<Grid className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 my-3">
					<div className="flex flex-row items-center ">
						<Typography
							variant="subtitle1"
							fontWeight={700}
							className="whitespace-nowrap"
						>
							{/* {t("employee:EmployeeList")} */}
							Transaction Info
						</Typography>
					</div>
					{/* <Input
              className="w-full sm:max-w-xs"
              placeholder="Search Order By Invoice Id"
              suffix={<BsSearch />}
              style={{ width: "auto" }}
              size="large"
              allowClear
            /> */}
				</Grid>
				<Descriptions
					bordered
					column={{ xs: 1, sm: 1, md: 2 }}
				>
					<Descriptions.Item label="Customer">
						<b>Name:</b> {orderDataById?.data?.data?.customer?.name}
						<br />
						<b>Gender:</b> {orderDataById?.data?.data?.customer?.gender}
						<br />
						<b>Phone:</b> {orderDataById?.data?.data?.customer?.phone}
						<br />
						<b>Email:</b> {orderDataById?.data?.data?.customer?.email}
						<br />
						<b>Address:</b> {orderDataById?.data?.data?.customer?.address}
						<br />
					</Descriptions.Item>
					<Descriptions.Item label="Order Info">
						<b>Invoice No:</b> {orderDataById?.data?.data?.invoice}
						<br />
						<b>Order Type:</b> {orderDataById?.data?.data?.type}
						<br />
						<b>Regular Price:</b> {orderDataById?.data?.data?.total}
						<br />
						<b>Discount:</b> {orderDataById?.data?.data?.discount}
						{!!orderDataById?.data?.data?.delivery_charge && (
							<>
								<b>Delivery Charge:</b>{" "}
								{orderDataById?.data?.data?.delivery_charge}
							</>
						)}
						{orderDataById?.data?.data?.discount > 0 && (
							<>
								<br />
								<b>Sell Price:</b>{" "}
								{orderDataById?.data?.data?.total -
									orderDataById?.data?.data?.discount}
							</>
						)}
						<br />
						<b>Created By:</b> {orderDataById?.data?.data?.createdBy?.fullName}
						<br />
						<b>Created At: </b>
						{moment(orderDataById?.data?.data?.createdAt).format(
							"MMMM Do YYYY"
						)}
					</Descriptions.Item>
				</Descriptions>
			</Container>
		</>
	);
};

export default Info;
