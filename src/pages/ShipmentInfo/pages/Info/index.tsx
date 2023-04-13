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
          <Descriptions.Item label="Product">
            <b>Name:</b> {shipmentData?.data?.data?.product?.name}
            <br />
            <b>Category:</b> {shipmentData?.data?.data?.product?.category}
            <br />
            <b>Subcategory:</b> {shipmentData?.data?.data?.product?.subcategory}
            <br />
            <b>Created By:</b>{" "}
            {shipmentData?.data?.data?.product?.product?.fullName}
            <br />
            <b>Created At:</b>{" "}
            {moment(shipmentData?.data?.data?.product?.updatedAt).format(
              "MMMM Do YYYY"
            )}
            <br />
            <b>Updated By:</b>
            <br />
            <b>Updated At:</b>{" "}
            {moment(shipmentData?.data?.data?.product?.updatedAt).format(
              "MMMM Do YYYY"
            )}
          </Descriptions.Item>
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
            <b>Selling Price:</b> {shipmentData?.data?.data?.sellPrice}
            <br />
            <b>Supplier Commision:</b>{" "}
            {shipmentData?.data?.data?.supplierCommision}
            <br />
            <b>Shipment Cost:</b> {shipmentData?.data?.data?.shipmentCost}
            <br />
            <b>Weight:</b> {shipmentData?.data?.data?.weight}
          </Descriptions.Item>
        </Descriptions>
      </Container>
    </>
  );
};

export default Info;
