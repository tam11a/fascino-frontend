import handleResponse from "@/utilities/handleResponse";
import Label from "@components/Label";
import { Container } from "@mui/system";
import { Input } from "antd";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { message } from "@components/antd/message";
import { useGetSuppliersById, useUpdateSupplier } from "@/queries/suppliers";

const Info: React.FC = () => {
  const { sid } = useParams();

  const { reset, handleSubmit, control } = useForm({});

  const { data: supplierData } = useGetSuppliersById(sid);
  const { mutateAsync: updateSupplier } = useUpdateSupplier();

  React.useEffect(() => {
    if (!supplierData) return;
    reset({
      name: supplierData?.data?.data?.name,
      phone: supplierData?.data?.data?.phone,
      email: supplierData?.data?.data?.email,
      address: supplierData?.data?.data?.address,
    });
  }, [supplierData]);

  const onSubmit = async (data: any) => {
    message.open({
      type: "loading",
      content: "Updating Supplier Information..",
      duration: 0,
    });
    const res = await handleResponse(
      () =>
        updateSupplier({
          id: sid,
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
              <Label>Supplier Name</Label>
              <Controller
                control={control}
                name={"name"}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <Input
                    // className="w-1/2"
                    placeholder="Branch Name"
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
                  placeholder="Email"
                  size="large"
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  status={error ? "error" : ""}
                />
              )}
            />
          </div>
          <div>
            <Label>Address</Label>
            <Controller
              control={control}
              name={"address"}
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
