import handleResponse from "@/utilities/handleResponse";
import Label from "@components/Label";
import { Container } from "@mui/system";
import { Input, Select } from "antd";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { message } from "@components/antd/message";
import { useGetCustomersById, useUpdateCustomer } from "@/queries/customer";

const Info: React.FC = () => {
  const { cid } = useParams();

  const { reset, handleSubmit, control } = useForm({});

  const { data: customerData } = useGetCustomersById(cid);
  const { mutateAsync: updateCustomer } = useUpdateCustomer();

  React.useEffect(() => {
    if (!customerData) return;
    reset({
      name: customerData?.data?.data?.name,
      phone: customerData?.data?.data?.phone,
      address: customerData?.data?.data?.address,
      email: customerData?.data?.data?.email,
      gender: customerData?.data?.data?.gender,
      badge: customerData?.data?.data?.badge,
      dob: customerData?.data?.data?.dob,
      //   bank: customerData?.data?.data?.bank,
      //   bkash: customerData?.data?.data?.bkash,
    });
  }, [customerData]);

  const onSubmit = async (data: any) => {
    message.open({
      type: "loading",
      content: "Updating Customer Information..",
      duration: 0,
    });
    const res = await handleResponse(
      () =>
        updateCustomer({
          id: cid,
          data,
        }),
      [200]
    );
    message.destroy();
    if (res.status) {
      message.success("Information updated successfully!");
    } else {
      message.error(res.message);
    }
  };
  return (
    <>
      <Container maxWidth={"xs"}>
        <form
          className="py-3 grid grid-cols-1 mt-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="flex flex-col">
              <Label>Customer Name</Label>
              <Controller
                control={control}
                name={"name"}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <Input
                    // className="w-1/2"
                    placeholder="Customer Name"
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
              <Label>Phone</Label>
              <Controller
                control={control}
                name={"phone"}
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
          <div className="flex flex-col">
            <Label>Email</Label>
            <Controller
              control={control}
              name={"email"}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <Input
                  // className="w-1/2"
                  placeholder="Enter an email"
                  size="large"
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  status={error ? "error" : ""}
                />
              )}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="flex flex-col">
              <Label>Gender</Label>
              <Controller
                control={control}
                name={"gender"}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <Select
                    placeholder={"Gender"}
                    size={"large"}
                    className="gender relative"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    options={[
                      { value: "male", label: "Male" },
                      { value: "female", label: "Female" },
                      { value: "others", label: "Others" },
                    ]}
                    status={error ? "error" : ""}
                    // loading={isLoading}
                  />
                )}
              />
            </div>
            <div className="flex flex-col">
              <Label>Badge</Label>
              <Controller
                control={control}
                name={"badge"}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <Select
                    placeholder={"Badge"}
                    size={"large"}
                    className="gender relative"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    options={[
                      { value: "Premium", label: "Premium" },
                      { value: "Gold", label: "Gold" },
                      { value: "Silver ", label: "Silver " },
                    ]}
                    status={error ? "error" : ""}
                    // loading={isLoading}
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
              // rules={{ required: true }}
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
