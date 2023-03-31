import handleResponse from "@/utilities/handleResponse";
import Label from "@components/Label";
import { Container } from "@mui/system";
import { Input } from "antd";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { message } from "@components/antd/message";
import { useGetOrderById, useUpdateOrder } from "@/queries/order";

const Info: React.FC = () => {
  const { oid } = useParams();

  const { reset, handleSubmit, control } = useForm({});

  const { data: orderData } = useGetOrderById(oid);
  // const { mutateAsync: updateOrder } = useUpdateOrder();

  React.useEffect(() => {
    if (!orderData) return;
    reset({
      name: orderData?.data?.data?.name,
      phone: orderData?.data?.data?.phone,
      address: orderData?.data?.data?.address,
    });
  }, [orderData]);

  // const onSubmit = async (data: any) => {
  //   message.open({
  //     type: "loading",
  //     content: "Updating Order Information..",
  //     duration: 0,
  //   });
  //   const res = await handleResponse(
  //     () =>
  //       updateOrder({
  //         id: bid,
  //         data,
  //       }),
  //     [200]
  //   );
  //   message.destroy();
  //   if (res.status) {
  //     message.success("Information updated successfully!");
  //   } else {
  //     message.error(res.message);
  //   }
  // };
  return (
    <>
      <Container maxWidth={"xs"}>
        <form
          className="py-3 grid grid-cols-1 mt-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="flex flex-col">
              <Label isRequired>Order Name</Label>
              <Controller
                control={control}
                name={"name"}
                rules={{ required: true }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <Input
                    // className="w-1/2"
                    placeholder="Order Name"
                    size="large"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    status={error ? "error" : ""}
                  />
                )}
              />
            </div>
            <div className="flex flex-col">
              <Label isRequired>Phone</Label>
              <Controller
                control={control}
                name={"phone"}
                rules={{ required: true }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <Input
                    // className="w-1/2"
                    placeholder="Phone"
                    size="large"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    status={error ? "error" : ""}
                  />
                )}
              />
            </div>
          </div>
          <div>
            <Label>Address</Label>
            <Controller
              control={control}
              name={"address"}
              rules={{ required: true }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <Input.TextArea
                  placeholder="Enter address"
                  showCount
                  maxLength={1000}
                  autoSize={{ minRows: 4 }}
                  size="large"
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  status={error ? "error" : ""}
                />
              )}
            />
          </div>
          <Button
            variant="contained"
            size="large"
            fullWidth
            className="my-4"
            type="submit"
          >
            Update Information
          </Button>
        </form>
      </Container>
    </>
  );
};

export default Info;
