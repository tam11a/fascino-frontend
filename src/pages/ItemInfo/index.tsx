import React from "react";
import { Container } from "@mui/system";
import { Descriptions } from "antd";
import { useParams } from "react-router-dom";
// import { useGetShipmentById } from "@/queries/shipment";
import moment from "moment";
import { useGetItemById } from "@/queries/item";
const Info: React.FC = ({}) => {
  const { iid } = useParams();

  // const { reset, handleSubmit, control } = useForm({});

  const { data: itemData } = useGetItemById(iid);
  console.log(itemData?.data);
  return (
    <>
      <Container>
        <Descriptions bordered column={{ xs: 1, sm: 1, md: 2 }}>
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
              "MMMM Do YYYY"
            )}
            <br />
            <b>Updated At: </b>
            {moment(itemData?.data?.data?.shipment?.supplier?.updatedAt).format(
              "MMMM Do YYYY"
            )}
          </Descriptions.Item>
          {/* {!!itemData?.data.data.return.length ? (
            <Descriptions.Item label="Shipment Details">
              <b>Buying Price:</b> {itemData?.data?.data?.buyingPrice}
              <br />
              <b>Selling Price:</b> {itemData?.data?.data?.sellPrice}
              <br />
              <b>Supplier Commision:</b>{" "}
              {itemData?.data?.data?.supplierCommision}
              <br />
              <b>Shipment Cost:</b> {itemData?.data?.data?.shipmentCost}
              <br />
              <b>Tax:</b> {itemData?.data?.data?.tax}
              <br />
              <b>Weight:</b> {itemData?.data?.data?.weight}
            </Descriptions.Item>
          ) : (
            ""
          )} */}
        </Descriptions>
      </Container>
    </>
  );
};

export default Info;
