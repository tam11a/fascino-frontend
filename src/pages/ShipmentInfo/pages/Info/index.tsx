import React from "react";
import { Container } from "@mui/system";
import { Descriptions } from "antd";
import { useParams } from "react-router-dom";
import { useGetShipmentById } from "@/queries/shipment";
import moment from "moment";
const Info: React.FC = ({}) => {
  const { shid } = useParams();

  // const { reset, handleSubmit, control } = useForm({});

  const { data: shipmentData } = useGetShipmentById(shid);
  console.log(shipmentData);
  return (
    <>
      <Container>
        <Descriptions bordered column={{ xs: 1, sm: 1, md: 2 }}>
          <Descriptions.Item label="Supplier">
            <b>Name:</b> {shipmentData?.data?.data?.supplier?.name}
            <br />
            <b>Email:</b> {shipmentData?.data?.data?.supplier?.email}
            <br />
            <b>Phone:</b> {shipmentData?.data?.data?.supplier?.phone}
            <br />
            <b>Address:</b> {shipmentData?.data?.data?.supplier?.address}
            <br />
            <b>Created By:</b>{" "}
            {shipmentData?.data?.data?.supplier?.createdBy?.fullName}
            <br />
            <b>Created At: </b>
            {moment(shipmentData?.data?.data?.supplier?.createdAt).format(
              "MMMM Do YYYY"
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Shipment Details">
            <b>Buying Price:</b> {shipmentData?.data?.data?.buyingPrice}
            <br />
            <b>Buying Discount:</b> {shipmentData?.data?.data?.buyingDiscount}
            <br />
            <b>Total Price:</b>{" "}
            {shipmentData?.data?.data?.buyingPrice -
              shipmentData?.data?.data?.buyingDiscount}
            <br />
            <b>Weight:</b> {shipmentData?.data?.data?.weight}
            <br />
            <b>Weight Cost:</b> {shipmentData?.data?.data?.weightCost}
            <br />
            <b>Shipment Cost:</b>{" "}
            {shipmentData?.data?.data?.weight *
              shipmentData?.data?.data?.weightCost}
            <br />
            <b>Supplier Commision:</b>{" "}
            {shipmentData?.data?.data?.supplierCommision}
          </Descriptions.Item>
        </Descriptions>
      </Container>
    </>
  );
};

export default Info;
