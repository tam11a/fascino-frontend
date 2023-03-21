import React from "react";
import handleResponse from "@/utilities/handleResponse";
import Label from "@components/Label";
import { Container } from "@mui/system";
import { Input } from "antd";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";

import { message } from "@components/antd/message";
import { useGetTailorById, useUpdateTailor } from "@/queries/tailor";

const Info: React.FC = ({}) => {
  const { tid } = useParams();

  const { reset, handleSubmit, control } = useForm({});

  const { data: tailorData } = useGetTailorById(tid);
  const { mutateAsync: updateTailor } = useUpdateTailor();

  React.useEffect(() => {
    if (!tailorData) return;
    reset({
      name: tailorData?.data?.data?.name,
      ownerName: tailorData?.data?.data?.ownerName,
      phone: tailorData?.data?.data?.phone,
      address: tailorData?.data?.data?.address,
    });
  }, [tailorData]);

  const onSubmit = async (data: any) => {
    message.open({
      type: "loading",
      content: "Updating Tailor Information..",
      duration: 0,
    });
    const res = await handleResponse(
      () =>
        updateTailor({
          id: tid,
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
              <Label>Tailor Name</Label>
              <Controller
                control={control}
                name={"name"}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <Input
                    // className="w-1/2"
                    placeholder="Tailor Name"
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
              <Label>Owner</Label>
              <Controller
                control={control}
                name={"ownerName"}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <Input
                    // className="w-1/2"
                    placeholder="Owner Name"
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
                  placeholder="Phone Number"
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
            <Label>Address</Label>
            <Controller
              control={control}
              name={"address"}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <Input.TextArea
                  // className="w-1/2"
                  placeholder="Address.."
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
