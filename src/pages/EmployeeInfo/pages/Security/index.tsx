import React from "react";
import { Button, Container, Icon, Tooltip, Typography } from "@mui/material";
import { Input } from "antd";
import { AiFillInfoCircle } from "react-icons/ai";
import { Controller, FieldValues, useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
import { message } from "@components/antd/message";
// import handleResponse from "@/utilities/handleResponse";
// import { useUpdatePassword } from "@queries/auth";
import { joiResolver } from "@hookform/resolvers/joi";
import ErrorSuffix from "@components/antd/ErrorSuffix";
import { useParams } from "react-router-dom";
import { useResetEmployeePassword } from "@/queries/employees";
import handleResponse from "@/utilities/handleResponse";
import { resetPasswordResolver } from "@pages/Settings/pages/Security/resolver";
import { AccessMargin } from "@tam11a/react-use-access";
import defaultPermissions from "@/utilities/defaultPermissions";

const Security: React.FC = () => {
  const { eid } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const { handleSubmit, control, reset } = useForm({
    resolver: joiResolver(resetPasswordResolver),
  });

  const { mutateAsync: updateEmployeePassword, isLoading: isSubmitting } =
    useResetEmployeePassword();

  const onValid = async (d: FieldValues) => {
    messageApi.open({
      type: "loading",
      content: `Creating new password...`,
      duration: 0,
    });
    const res = await handleResponse(
      () => updateEmployeePassword({ uid: eid, ...d }),
      [200]
    );
    messageApi.destroy();
    if (res.status) {
      messageApi.success("Password updated successfully!");
      reset();
    } else messageApi.error(res.message);
  };

  return (
    <AccessMargin to={defaultPermissions.RESETPASSWORD} defaultFallback>
      <Container maxWidth={"xs"}>
        {contextHolder}
        <Typography variant="h6" className="pt-5">
          Reset Password
        </Typography>
        <form className="py-2" onSubmit={handleSubmit(onValid)}>
          <Controller
            control={control}
            name={"password"}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <>
                <Typography
                  variant="overline"
                  className="flex flex-row items-center gap-1 mt-2"
                >
                  New Password
                  {error ? (
                    <ErrorSuffix error={error} />
                  ) : (
                    <Tooltip
                      title="Password should be atleast 6 characters long."
                      arrow
                      placement="right"
                    >
                      <Icon color={"action"} className="text-base mb-1">
                        <AiFillInfoCircle />
                      </Icon>
                    </Tooltip>
                  )}
                </Typography>
                <Input.Password
                  placeholder="New Password"
                  size="large"
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  status={error ? "error" : ""}
                />
              </>
            )}
          />

          <Controller
            control={control}
            name={"cpassword"}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <>
                <Typography
                  variant="overline"
                  className="flex flex-row items-center gap-1 mt-2"
                >
                  Confirm New Password
                  {error ? (
                    <ErrorSuffix error={error} />
                  ) : (
                    <Tooltip
                      title="Re-enter your new password"
                      arrow
                      placement="right"
                    >
                      <Icon color={"action"} className="text-base mb-1">
                        <AiFillInfoCircle />
                      </Icon>
                    </Tooltip>
                  )}
                </Typography>
                <Input.Password
                  placeholder={"Confirm New Password"}
                  size="large"
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  status={error ? "error" : ""}
                />
              </>
            )}
          />
          <Button
            size="large"
            variant="contained"
            fullWidth
            className="mt-5"
            type="submit"
            disabled={isSubmitting}
            //   disabled
          >
            Create New Password
          </Button>
        </form>
      </Container>
    </AccessMargin>
  );
};

export default Security;
