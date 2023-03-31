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
import { Input, Select } from "antd";
import { MdClose } from "react-icons/md";
import Label from "@components/Label";
import handleResponse from "@/utilities/handleResponse";
import { message } from "@components/antd/message";
import useAreYouSure from "@/hooks/useAreYouSure";
import { useParams } from "react-router-dom";
import { useAddTransaction } from "@/queries/order";

const AddTransaction: React.FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  const { oid } = useParams();

  const { handleSubmit, control } = useForm({});
  const { mutateAsync: addTransaction, isLoading } = useAddTransaction();

  const onSubmit = async (data: any) => {
    message.open({
      type: "loading",
      content: "Adding Transaction..",
      duration: 0,
    });
    const res = await handleResponse(() =>
      addTransaction({
        id: oid,
        data,
      })
    );
    message.destroy();
    if (res.status) {
      message.success("Transaction added successfully!");
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
              primary={"Transaction"}
              secondary={`Add a New Transaction`}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="flex flex-col relative">
                <Label isRequired>Amount</Label>
                <Controller
                  control={control}
                  name={"amount"}
                  rules={{ required: true }}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <Input
                      // className="w-1/2"
                      placeholder="Enter amount"
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
                <Label isRequired>Payment Method</Label>
                <Controller
                  control={control}
                  name={"method"}
                  rules={{ required: true }}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <Select
                      // className="w-1/2"
                      placeholder="Payment Method"
                      size="large"
                      options={[
                        {
                          label: "Card",
                          value: "Card",
                        },
                        {
                          label: "Cash",
                          value: "Cash",
                        },
                        {
                          label: "bKash",
                          value: "bKash",
                        },

                        {
                          label: "COD",
                          value: "COD",
                        },
                      ]}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      status={error ? "error" : ""}
                    />
                  )}
                />
              </div>
            </div>
          </DialogContent>
          <Divider />
          <DialogActions>
            <Button
              variant={"contained"}
              disabled={isLoading}
              // disabled
              type={"submit"}
            >
              Add
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

export default AddTransaction;
