import useUser from "@/hooks/useUser";
import handleResponse from "@/utilities/handleResponse";
import { useGetEmployeesById, useUpdateEmployee } from "@/queries/employees";
import Label from "@components/Label";
import { Container } from "@mui/system";
import { Input, message } from "antd";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";

const Info: React.FC = ({}) => {
  const { eid } = useParams();

  const { reset, handleSubmit, control } = useForm({});

  const { data: employeeData, isLoading } = useGetEmployeesById(eid);
  const { mutateAsync: updateUser, isLoading: isSubmitting } =
    useUpdateEmployee();

  React.useEffect(() => {
    if (!employeeData) return;
    reset({
      userName: employeeData?.data?.data?.userName,
      firstName: employeeData?.data?.data?.firstName,
      lastName: employeeData?.data?.data?.lastName,
      phone: employeeData?.data?.data?.phone,
      email: employeeData?.data?.data?.email,
      dob: employeeData?.data?.data?.dob,
      hireDate: employeeData?.data?.data?.hireDate,
      workHour: employeeData?.data?.data?.workHour,
      bank: employeeData?.data?.data?.bank,
      bKash: employeeData?.data?.data?.bKash,
      role: employeeData?.data?.data?.role,
    });
  }, [employeeData]);

  const onSubmit = async (data: any) => {
    message.open({
      type: "loading",
      content: "Updating Employee Information..",
      duration: 0,
    });
    const res = await handleResponse(
      () =>
        updateUser({
          id: eid,
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
      <Container maxWidth={"lg"}>
        <form
          className="py-3 grid grid-cols-1 mt-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="flex flex-col">
              <Label isRequired>First Name</Label>
              <Controller
                control={control}
                name={"firstName"}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <Input
                    // className="w-1/2"
                    placeholder="First Name"
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
              <Label isRequired>Last Name</Label>
              <Controller
                control={control}
                name={"lastName"}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <Input
                    // className="w-1/2"
                    placeholder="Last Name"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
            <div className="flex flex-col">
              <Label info="Phone number can't be updated">Phone</Label>
              <Controller
                control={control}
                name={"phone"}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <Input
                    placeholder="Phone"
                    size="large"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    status={error ? "error" : ""}
                    disabled
                  />
                )}
              />
            </div>

            <div className="flex flex-col">
              <Label isRequired>Email</Label>
              <Controller
                control={control}
                name={"email"}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <Input
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
          </div>
          <div>
            <Label isRequired>Address</Label>
            <Controller
              control={control}
              name={"address"}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <Input.TextArea
                  placeholder="Address"
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
