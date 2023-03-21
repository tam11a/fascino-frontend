import React from "react";
import handleResponse from "@/utilities/handleResponse";
import Label from "@components/Label";
import { Container } from "@mui/system";
import { Cascader, Input } from "antd";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";

import { message } from "@components/antd/message";
import { useGetProductById, useUpdateProduct } from "@/queries/products";

const Info: React.FC = ({}) => {
  const { pid } = useParams();

  const { reset, handleSubmit, control } = useForm({});

  const { data: productData } = useGetProductById(pid);
  const { mutateAsync: updateProduct } = useUpdateProduct();

  React.useEffect(() => {
    if (!productData) return;
    reset({
      name: productData?.data?.data?.name,
      description: productData?.data?.data?.firstName,
      category: productData?.data?.data?.category,
      subcategory: productData?.data?.data?.subcategory,
      price: productData?.data?.data?.price,
    });
  }, [productData]);

  const onSubmit = async (data: any) => {
    message.open({
      type: "loading",
      content: "Updating Employee Information..",
      duration: 0,
    });
    const res = await handleResponse(
      () =>
        updateProduct({
          id: pid,
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
            <div className="flex flex-col relative">
              <Label>Name</Label>
              <Controller
                control={control}
                name={"name"}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <Input
                    // className="w-1/2"
                    placeholder="Product Name"
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
              <Label>Price</Label>
              <Controller
                control={control}
                name={"price"}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <Input
                    // className="w-1/2"
                    placeholder="Product Price"
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
            <Label>Category</Label>
            <Controller
              control={control}
              name={"gender"}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <Cascader
                  size="large"
                  placeholder="Select a category"
                  // expandTrigger="hover"
                  allowClear={false}
                  value={value}
                  showSearch
                  //   loading={isLoading}
                  //   options={catOptions}
                  onChange={onChange}
                  onBlur={onBlur}
                  className="w-full"
                  status={error ? "error" : ""}
                  //   disabled={isLoading}
                />
              )}
            />
          </div>
          <div className="flex flex-col">
            <Label>Description</Label>
            <Controller
              control={control}
              name={"description"}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <Input
                  // className="w-1/2"
                  placeholder="Description.."
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
            disabled
            //need to add category system
          >
            Update Information
          </Button>
        </form>
      </Container>
    </>
  );
};

export default Info;
