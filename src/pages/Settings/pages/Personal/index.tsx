import React from "react";
import {
  Button,
  Container,
  Icon,
  // Skeleton,
  Tooltip,
  Typography,
} from "@mui/material";
import { Input } from "antd";
import { AiFillInfoCircle } from "react-icons/ai";
import useUser from "@/hooks/useUser";
import { Controller, useForm, FieldValues } from "react-hook-form";
import handleResponse from "@/utilities/handleResponse";
import { message } from "@components/antd/message";
import ErrorSuffix from "@components/antd/ErrorSuffix";
import { useUpdateUserInfo } from "@/queries/auth";

const Personal: React.FC = () => {
  const user = useUser();
  const [messageApi, contextHolder] = message.useMessage();
  const {
    reset,
    handleSubmit,
    control,
    formState: { isDirty },
  } = useForm({});
  const { mutateAsync: updateUser, isLoading: isSubmitting } =
    useUpdateUserInfo();
  // console.log(user);

  React.useEffect(() => {
    if (!user || isDirty) return;
    // setValue("userName", user.userName);
    // setValue("firstName", user.firstName);
    // setValue("lastName", user.lastName);
    // setValue("phone", user.phone);
    // setValue("email", user.email);
    // setValue("role", user.role);

    reset({
      userName: user.userName,
      firstName: user?.firstName,
      lastName: user?.lastName,
      phone: user?.phone,
      email: user?.email,
      role: user?.role,
    });
  }, [user.userName, user?.firstName, user?.lastName, user?.email, user?.role]);

  const onValid = async (d: FieldValues) => {
    messageApi.open({
      type: "loading",
      content: `Updating information...`,
      duration: 0,
    });
    const res = await handleResponse(
      () =>
        updateUser({
          userId: user._id,
          data: d,
        }),
      [201]
    );
    messageApi.destroy();
    if (res.status) messageApi.success("Information updated successfully!");
    else messageApi.error(res.message);
  };

  return (
    <Container maxWidth={"xs"}>
      {contextHolder}
      <form className="py-3" onSubmit={handleSubmit(onValid)}>
        <Typography
          variant="overline"
          className="flex flex-row items-center gap-1 mt-2"
        >
          Full Name
        </Typography>
        {/* {isSubmitting ? (
          <Skeleton variant="rectangular" height={"40px"} />
        ) : ( */}
        <Input.Group compact>
          <Controller
            control={control}
            name={"firstName"}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <Input
                className="w-1/2"
                placeholder="First Name"
                size="large"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                status={error ? "error" : ""}
                suffix={<ErrorSuffix error={error} />}
              />
            )}
          />
          <Controller
            control={control}
            name={"lastName"}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <Input
                className="w-1/2"
                placeholder="Last Name"
                size="large"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                status={error ? "error" : ""}
                suffix={<ErrorSuffix error={error} />}
              />
            )}
          />
        </Input.Group>
        {/* )} */}

        <Typography
          variant="overline"
          className="flex flex-row items-center gap-1 mt-2"
        >
          Username
        </Typography>
        {/* {isLoading ? (
          <Skeleton variant="rectangular" height={"40px"} />
        ) : ( */}
        <Controller
          control={control}
          name={"userName"}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Username"
              size="large"
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              disabled
            />
          )}
        />
        {/* )} */}

        <Typography
          variant="overline"
          className="flex flex-row items-center gap-1 mt-2"
        >
          Phone Number
        </Typography>

        {/* {isLoading ? (
          <Skeleton variant="rectangular" height={"40px"} />
        ) : ( */}
        <Controller
          control={control}
          name={"phone"}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Phone Number"
              size="large"
              onChange={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
        {/* )} */}
        <Typography
          variant="overline"
          className="flex flex-row items-center gap-1 mt-2"
        >
          Email
          <Tooltip
            title={"Please enter a valid email address"}
            arrow
            placement="right"
          >
            <Icon color={"action"} className="text-base mb-1">
              <AiFillInfoCircle />
            </Icon>
          </Tooltip>
        </Typography>
        {/* {isLoading ? (
          <Skeleton variant="rectangular" height={"40px"} />
        ) : ( */}
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
              suffix={<ErrorSuffix error={error} />}
              disabled
            />
          )}
        />

        <Button
          size="large"
          variant="contained"
          fullWidth
          className="mt-2"
          type="submit"
          disabled={isSubmitting}
        >
          Update Information
        </Button>
      </form>
    </Container>
  );
};

export default Personal;
