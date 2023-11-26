import { Container } from "@mui/system";
import { Descriptions } from "antd";
import React from "react";
import { useParams } from "react-router-dom";
import { useGetInvoiceById, useGetOrderById } from "@/queries/order";
import moment from "moment";
import { Grid, Typography } from "@mui/material";
import { useReactToPrint } from "react-to-print";
import { PrintableArea } from "@pages/POS";

const Info: React.FC = () => {
	const { oid } = useParams();
	const { data: orderDataById } = useGetOrderById(oid);
	const { data: invoiceDataById } = useGetInvoiceById(oid);

	console.log("invoiceDataById", invoiceDataById);

	//Print Function

	const printRef = React.useRef(null);

	const reactToPrintContent = React.useCallback(() => {
		return printRef.current;
	}, [printRef.current]);

	const handlePrint = useReactToPrint({
		content: reactToPrintContent,
		documentTitle: "Invoice",
		removeAfterPrint: true,
		pageStyle: `
    @page {
      // size: 2.17in 0.71in;
      // margin: 0in 0.4in 0.67in 0.85in;
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

	const printA5Ref = React.useRef(null);

	const reactToPrintA5Content = React.useCallback(() => {
		return printA5Ref.current;
	}, [printRef.current]);

	const handlePrintA5 = useReactToPrint({
		content: reactToPrintA5Content,
		documentTitle: "Invoice",
		removeAfterPrint: true,
		pageStyle: `
    @page {
      // size: 2.17in 0.71in;
      // margin: 0in 0.4in 0.67in 0.85in;
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
			{/* 
        Invoice Container
      */}
			{/* <div className="hidden">
				<div ref={printRef}>
					<PrintableArea
						{...{
							posProducts,
							subTotal,
							stitchCost,
							paid,
							discount,
							transactions,
							exchange,
							deliveryCharge,
							selectedCustomer,
							branch: selectedBranch,
							method: payMethod,
						}}
					/>
				</div>
				<hr className="my-5" />
				<div ref={printA5Ref}>
					<PrintableArea
						{...{
							posProducts,
							subTotal,
							stitchCost,
							paid,
							discount,
							transactions,
							exchange,
							deliveryCharge,
							selectedCustomer,
							branch: selectedBranch,
							method: payMethod,
						}}
						isA5={true}
					/>
				</div>
			</div> */}
		</>
	);
};

export default Info;
