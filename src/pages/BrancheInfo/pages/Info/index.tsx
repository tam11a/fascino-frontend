import handleResponse from "@/utilities/handleResponse";
import { useGetEmployeesById, useUpdateEmployee } from "@/queries/employees";
import Label from "@components/Label";
import { Container } from "@mui/system";
import { Input, Select } from "antd";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { IRole } from "@pages/Roles/types/types";
import { message } from "@components/antd/message";
import { useGetBranchById, useUpdateBranch } from "@/queries/branch";

const Info: React.FC = () => {
  const { bid } = useParams();

  const { reset, handleSubmit, control } = useForm({});

  const { data: branchData } = useGetBranchById(bid);
  const { mutateAsync: updateBranch } = useUpdateBranch();

  React.useEffect(() => {
    if (!branchData) return;
    reset({
      name: branchData?.data?.data?.name,
      phone: branchData?.data?.data?.phone,
      address: branchData?.data?.data?.address,
    });
  }, [branchData]);

  const onSubmit = async (data: any) => {
    message.open({
      type: "loading",
      content: "Updating Branch Information..",
      duration: 0,
    });
    const res = await handleResponse(
      () =>
        updateBranch({
          id: bid,
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
              <Label isRequired>Branch Name</Label>
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
