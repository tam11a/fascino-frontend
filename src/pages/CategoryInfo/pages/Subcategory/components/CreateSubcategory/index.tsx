import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  ListItemText,
} from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Input } from "antd";
import { MdClose } from "react-icons/md";
import Label from "@components/Label";
import handleResponse from "@/utilities/handleResponse";
import { message } from "@components/antd/message";
import useAreYouSure from "@/hooks/useAreYouSure";
import { useCreateSubcategory } from "@/queries/subcategory";
import { useParams } from "react-router-dom";

const CreateSubcategory: React.FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  const { catid } = useParams();
  const {
    // reset,
    handleSubmit,
    control,
    getValues,
    setValue,
  } = useForm({
    // resolver: zodResolver(userInfoResolver),
  });
  const { mutateAsync: createSubcategory, isLoading: SubcategoryLoading } =
    useCreateSubcategory();

  const reset = () => {
    Object.keys(getValues())?.map((field: string) =>
      setValue(field, undefined)
    );
  };

  const onSubmit = async (data: any) => {
    message.open({
      type: "loading",
      content: "Creating Subcategory..",
      duration: 0,
    });
    const res = await handleResponse(
      () =>
        createSubcategory({
          ...data,
          category: catid,
        }),
      [201]
    );
    message.destroy();
    if (res.status) {
      message.success("Subcategory created successfully!");
      reset();
      onClose();
    } else {
      message.error(res.message);
    }
  };

  const { contextHolder: closeContextHolder, open: openClose } = useAreYouSure({
    title: "WANT TO CLOSE?",
    okText: "Close Anyway",
    cancelText: "Cancel",
  });

  const handleClose = () =>
    openClose(
      onClose,
      <>
        You may have some unsaved changes which will be lost closing the dialog.
      </>
    );
  {
    ("");
  }

  return (
    <>
      {closeContextHolder}
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: "98vw !important",
            maxWidth: "560px !important",
          },
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle className={"flex flex-row items-center justify-between"}>
            <ListItemText
              primary={"Subcategory"}
              secondary={`Create a New Subcategory`}
              primaryTypographyProps={{
                fontWeight: "700",
                color: "#000",
              }}
              className="p-0 m-0"
            />
            <IconButton size="small" onClick={handleClose}>
              <MdClose />
            </IconButton>
          </DialogTitle>
          <Divider />
          <DialogContent>
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-2"> */}
            <div className="flex flex-col relative">
              <Label isRequired>Name</Label>
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
                    placeholder="Enter Subcategory name"
                    size="large"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    status={error ? "error" : ""}
                  />
                )}
              />
            </div>
            {/* </div> */}

            <div>
              <Label>Description</Label>
              <Controller
                control={control}
                name={"description"}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <Input.TextArea
                    placeholder="Enter Description"
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
          </DialogContent>
          <Divider />
          <DialogActions>
            <Button
              variant={"contained"}
              disabled={SubcategoryLoading}
              type={"submit"}
            >
              Create
            </Button>
            <Button variant={"outlined"} onClick={handleClose}>
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default CreateSubcategory;
