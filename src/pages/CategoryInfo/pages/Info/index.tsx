import handleResponse from "@/utilities/handleResponse";
import Label from "@components/Label";
import { Container } from "@mui/system";
import { Input } from "antd";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { message } from "@components/antd/message";
import { useGetCategoriesById, useUpdateCategory } from "@/queries/category";

const Info: React.FC = () => {
  const { catid } = useParams();

  const { reset, handleSubmit, control } = useForm({});

  const { data: categoryData } = useGetCategoriesById(catid);
  const { mutateAsync: updateCategory } = useUpdateCategory();

  React.useEffect(() => {
    if (!categoryData) return;
    reset({
      name: categoryData?.data?.data?.name,
      description: categoryData?.data?.data?.description,
    });
  }, [categoryData]);

  const onSubmit = async (data: any) => {
    message.open({
      type: "loading",
      content: "Updating Category Information..",
      duration: 0,
    });
    const res = await handleResponse(
      () =>
        updateCategory({
          id: catid,
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
          <div className="flex flex-col">
            <Label isRequired>category Name</Label>
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
                  placeholder="Category Name"
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
            <Label>Description</Label>
            <Controller
              control={control}
              name={"description"}
              rules={{ required: true }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <Input.TextArea
                  placeholder="Enter description"
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
