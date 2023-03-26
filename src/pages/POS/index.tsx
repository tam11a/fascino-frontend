import { IOption } from "@/hooks/useCategory/type";
import { useGetBranch } from "@/queries/branch";
import Iconify from "@components/iconify";
import {
  Divider,
  Icon,
  Button,
  Typography,
  ListItemText,
  IconButton,
  Avatar,
  List,
  ListItem,
  Drawer,
  Dialog,
  DialogActions,
  Box,
} from "@mui/material";
import { usePaginate, useToggle } from "@tam11a/react-use-hooks";
import {
  Badge,
  FloatButton,
  Select,
  Spin,
  Input,
  Segmented,
  Switch,
  InputNumber,
  Dropdown,
} from "antd";
import React from "react";
import { useGetCustomers } from "@/queries/customer";
import CreateCustomer from "@pages/Customer/components/CreateCustomer";
// import { BarcodeScanner } from "@itexperts/barcode-scanner";
import { onBarcodeRead } from "physical-barcode-reader-observer";
import { message } from "@components/antd/message";
import { useGetScanById } from "@/queries/item";
import handleResponse from "@/utilities/handleResponse";
import { useGetTailor } from "@/queries/tailor";
import { SegmentedValue } from "antd/es/segmented";
import { useReactToPrint } from "react-to-print";
import { Preview, print } from "react-html2pdf";
import short from "short-uuid";
import { usePostOrder } from "@/queries/order";

const POS: React.FC = () => {
  const { state: open, toggleState: onClose } = useToggle(false);
  const { state: openInvoice, toggleState: onInvoiceClose } = useToggle(false);

  const [posInvoice, setPosInvoice] = React.useState(
    localStorage?.getItem("posInvoiceId") || short.generate()
  );

  React.useEffect(() => {
    localStorage.setItem("posInvoiceId", posInvoice);
  }, [posInvoice]);

  //Print Function

  const printRef = React.useRef(null);

  const reactToPrintContent = React.useCallback(() => {
    return printRef.current;
  }, [printRef.current]);

  const handlePrint = useReactToPrint({
    content: reactToPrintContent,
    documentTitle: "invoice-" + Date.now(),
    removeAfterPrint: true,
  });

  //Branch Section
  const { setSearch: setBranchSearch, getQueryParams: getBranchQueryParams } =
    usePaginate({
      defaultParams: {
        limit: 10,
      },
    });

  const { data: branchData, isLoading: isBranchLoading } = useGetBranch(
    getBranchQueryParams()
  );
  const [branches, setBranches] = React.useState<IOption[]>([]);

  React.useEffect(() => {
    if (!branchData) return;
    setBranches(
      Array.from(branchData?.data?.data || [], (d: any) => ({
        value: d?._id,
        label: d?.name,
        disabled: !d?.isActive,
      }))
    );
  }, [branchData]);

  const [selectedBranch, setSelectedBranch] = React.useState<IOption>(
    localStorage.getItem("sbpos")
      ? JSON.parse(localStorage.getItem("sbpos") || "{}")
      : null
  );

  React.useEffect(() => {
    localStorage.setItem("sbpos", JSON.stringify(selectedBranch));
  }, [selectedBranch]);

  //tailors section
  const { setSearch: setTailorSearch, getQueryParams: getTailorQueryParams } =
    usePaginate({
      defaultParams: {
        limit: 100,
      },
    });

  const { data: tailorData, isLoading: isTailorLoading } = useGetTailor(
    getTailorQueryParams()
  );
  const [tailors, setTailors] = React.useState<IOption[]>([]);

  React.useEffect(() => {
    if (!tailorData) return;
    setTailors(
      Array.from(tailorData?.data?.data || [], (d: any) => ({
        value: d?._id,
        label: d?.name,
        disabled: !d?.isActive,
      }))
    );
  }, [tailorData]);

  const [selectedTailor, setSelectedTailor] = React.useState<IOption>(
    localStorage.getItem("stpos")
      ? JSON.parse(localStorage.getItem("stpos") || "{}")
      : null
  );
  React.useEffect(() => {
    localStorage.setItem("stpos", JSON.stringify(selectedTailor));
  }, [selectedTailor]);

  //Customers Section
  const {
    setSearch: setCustomerSearch,
    getQueryParams: getCustomerQueryParams,
  } = usePaginate({
    defaultParams: {
      limit: 10,
    },
  });

  const { data: customerData, isLoading: isCustomerLoading } = useGetCustomers(
    getCustomerQueryParams()
  );
  const [customers, setCustomers] = React.useState<IOption[]>([]);

  React.useEffect(() => {
    if (!customerData) return;
    setCustomers(
      Array.from(customerData?.data?.data || [], (d: any) => ({
        value: d?._id,
        label: (
          <ListItemText
            primary={<>{d?.name}</>}
            secondary={d?.phone}
            primaryTypographyProps={{
              className: "font-bold",
            }}
          />
        ),
        data: d,
        disabled: !d?.isActive,
      }))
    );
  }, [customerData]);

  const { state: openCreateCustomer, toggleState: onCloseCreateCustomer } =
    useToggle(false);

  const [selectedCustomer, setSelectedCustomer] = React.useState<any>(
    localStorage.getItem("scpos")
      ? JSON.parse(localStorage.getItem("scpos") || "{}")
      : null
  );

  React.useEffect(() => {
    localStorage.setItem("scpos", JSON.stringify(selectedCustomer));
  }, [selectedCustomer]);

  const [posProducts, setPosProducts] = React.useState<{ [id: string]: any }>(
    JSON.parse(localStorage.getItem("pos_products") || "{}")
  );
  const [subTotal, setSubTotal] = React.useState(0);
  const [stitchCost, setStitchCost] = React.useState(0);
  const [discount, setDiscount] = React.useState(0);
  const [paid, setPaid] = React.useState(0);
  const [payMethod, setPayMethod] = React.useState<SegmentedValue>("Cash");
  const [online, setOnline] = React.useState(false);

  React.useEffect(() => {
    localStorage.setItem("pos_products", JSON.stringify(posProducts));
    let amount = 0;
    let stitchAmount = 0;
    Object.values(posProducts)?.map?.((p) => {
      amount += p.product.price || 0;
      stitchAmount += p.tailor?.fee || 0;
    });
    setSubTotal(amount);
    setStitchCost(stitchAmount);
  }, [posProducts]);

  const { mutateAsync: mutateProduct } = useGetScanById();

  const addProduct = async (id: string) => {
    const res = await handleResponse(() => mutateProduct(id));
    if (res.status)
      setPosProducts((p) => ({
        ...p,
        [res.data._id]: res.data,
      }));
    else message.error(res.message);
  };

  const { state: searchProducts, toggleState: onSearchProducts } =
    useToggle(false);

  let reader = onBarcodeRead();
  // const [products, setProducts] = React.useState<{ [id: string]: {} }>({});

  React.useEffect(() => {
    let event = reader.subscribe((result) => {
      const barcode = result.barcode;
      //   const type = result.type;
      //   const lastTarget = result.target;
      if (barcode.length === 24) {
        // console.log(barcode, type, lastTarget, result);
        message.success(`Scanned ${barcode}`);
        addProduct(barcode);
      }
    });
    return () => {
      event?.unsubscribe?.();
    };
  }, []);

  React.useEffect(() => {
    let event: any;
    if (searchProducts) {
      event = reader.subscribe((result) => {
        const barcode = result.barcode;
        // const type = result.type;
        // const lastTarget = result.target;
        // console.log(barcode, type, lastTarget, result);
        message.success(`Scanned ${barcode}`);
      });
      message.loading({
        content: "Scanning Barcode...",
        duration: 10,
        onClose: () => onSearchProducts(),
      });
    } else {
      event?.unsubscribe?.();
    }

    return () => {
      event?.unsubscribe?.();
    };
  }, [searchProducts]);

  const [searchInput, setSearchInput] = React.useState("");

  // console.log(
  //   posProducts,
  //   selectedCustomer,
  //   selectedBranch,
  //   online,
  //   payMethod,
  //   discount,
  //   paid
  // );

  const { mutateAsync: postOrder, isLoading: orderLoading } = usePostOrder();

  const submitToSave = async () => {
    const data = {
      invoice: posInvoice,
      customer: selectedCustomer?._id,
      type: online ? "online" : "offline",
      discount: discount || 0,
      paid: paid || 0,
      method: payMethod,
      products: Array.from(Object.values(posProducts), (p: any) => ({
        id: p._id,
        price: p.product.price,
        stitch: p.tailor
          ? {
              size: p.tailor?.size,
              fee: p.tailor?.fee,
            }
          : undefined,
      })),
      tailor: selectedTailor?.value,
    };

    const res = await handleResponse(() => postOrder(data), [201]);
    if (res.status) {
      message.success(res.message);
    } else {
      message.error(res.message);
    }
  };

  return (
    <>
      {/* <Container className="py-4"> */}
      <div className="relative flex flex-row items-center justify-between gap-2 p-3 bg-slate-100 rounded-md">
        <div className="flex flex-row items-center justify-between gap-2 pl-2">
          <Icon className="text-4xl">
            <Iconify icon={"mdi:shop-outline"} />
          </Icon>
          <Select
            bordered={false}
            placeholder={"Select Your Branch"}
            allowClear
            showSearch
            defaultActiveFirstOption
            size="large"
            onClear={() => setBranchSearch("")}
            onSearch={(v) => setBranchSearch(v)}
            value={selectedBranch?.value}
            onSelect={(_v, o) => setSelectedBranch(o)}
            loading={isBranchLoading}
            options={branches}
            filterOption={false}
            className="min-w-sm"
          />
        </div>
        <FloatButton.Group className="relative top-0 left-0" shape="square">
          <Badge count={0}>
            <FloatButton
              icon={<Iconify icon="game-icons:sewing-machine" />}
              onClick={onClose}
              // ={!!Object.keys(tailorProducts)?.length}
            />
          </Badge>
        </FloatButton.Group>
      </div>
      <div className="mt-5 min-h-[85vh] flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative flex flex-row items-center justify-between gap-2 p-1">
            <div className="flex flex-row items-center justify-between gap-3 pl-2">
              <Icon className="text-3xl">
                <Iconify icon="circum:shopping-basket" />
              </Icon>
              <Typography variant="h5" className="font-semibold">
                Products
              </Typography>
            </div>

            <FloatButton.Group
              className="relative top-0 left-0 flex flex-row w-fit gap-1"
              shape="square"
            >
              <FloatButton
                icon={<Iconify icon="ph:barcode-duotone" />}
                onClick={() => onSearchProducts()}
              />
              <form
                className="flex flex-row"
                onSubmit={(e) => {
                  e.preventDefault();
                  addProduct(searchInput);
                  setSearchInput("");
                }}
              >
                <Input
                  size={"small"}
                  bordered={false}
                  placeholder={"Search Barcode"}
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.currentTarget.value)}
                  allowClear
                />
              </form>
            </FloatButton.Group>
          </div>
          <Spin spinning={searchProducts}>
            {Object.values(posProducts)?.length > 0 ? (
              <List>
                {Object.values(posProducts)?.map?.((product: any) => (
                  <ListItem key={product?._id}>
                    <ListItemText
                      primary={product?.product?.name}
                      secondary={`${product?.product?.category?.name}/${product?.product?.subcategory?.name}`}
                      primaryTypographyProps={{
                        className: "font-bold",
                      }}
                      secondaryTypographyProps={{
                        className: "text-xs font-bold",
                      }}
                    />
                    <ListItemText
                      className="grow-0 mx-5"
                      //   primary={}
                      secondary={product?.product?.price || ""}
                      primaryTypographyProps={{
                        className: "font-bold",
                      }}
                      secondaryTypographyProps={{
                        className: "text-xs font-bold",
                      }}
                    />
                    <Badge dot={!!product?.tailor}>
                      <IconButton
                        size="small"
                        color="inherit"
                        className={`rounded ${
                          !!product?.tailor ? "bg-slate-100" : ""
                        }`}
                        onClick={() => {
                          setPosProducts((t) => ({
                            ...t,
                            [product?._id]: {
                              ...product,
                              tailor: product.tailor
                                ? undefined
                                : {
                                    fee: 0,
                                  },
                            },
                          }));
                        }}
                      >
                        <Iconify icon={"game-icons:sewing-machine"} />
                      </IconButton>
                    </Badge>
                    <IconButton
                      size="small"
                      color="error"
                      className="rounded ml-2"
                      onClick={() => {
                        // setPosProducts((p) => {
                        //   let x = Object.keys(p)?.filter?.(
                        //     (x: any) => x._id !== product?._id ? p[product?._id] : undefined
                        //   );
                        //   let y:{[id:string]: string} = {};
                        //   x?.map((z:{_id?: string}) => {
                        //     if(!z) return;
                        //     y[z?._id] = z
                        //   })
                        //   return (
                        //   );
                        // });
                      }}
                    >
                      <Iconify icon={"ic:baseline-delete-forever"} />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            ) : (
              <Avatar
                src={"/boxs.svg"}
                variant="square"
                className="w-9/12 max-w-md h-auto mx-auto my-5"
              />
            )}
          </Spin>
          <div className="flex flex-col float-right items-end gap-2 m-4 w-[95vw] max-w-[200px]">
            <div className="w-full flex flex-row items-center gap-4 justify-between">
              <Typography variant="body2">Subtotal : </Typography>
              <Typography variant="body2">{subTotal} ৳</Typography>
            </div>
            {!!stitchCost && (
              <div className="w-full flex flex-row items-center gap-4 justify-between">
                <Typography variant="body2">Stitch : </Typography>
                <Typography variant="body2">{stitchCost} ৳</Typography>
              </div>
            )}
            <div className="w-full flex flex-row items-center gap-4 justify-between">
              <Typography variant="body2">Discount : </Typography>
              <Typography variant="body2">{discount} ৳</Typography>
            </div>
            <div className="w-full flex flex-row items-center gap-4 justify-between">
              <Typography variant="body2">Total : </Typography>
              <Typography variant="body2">
                {subTotal - discount + stitchCost} ৳
              </Typography>
            </div>
            <div className="w-full flex flex-row items-center gap-4 justify-between">
              <Typography variant="body2">Paid : </Typography>
              <Typography variant="body2">{paid} ৳</Typography>
            </div>
            {!!(subTotal - discount - paid + stitchCost) && (
              <div className="w-full flex flex-row items-center gap-4 justify-between text-red-600">
                <Typography variant="body2">Due : </Typography>
                <Typography variant="body2">
                  {subTotal - discount - paid + stitchCost} ৳
                </Typography>
              </div>
            )}
          </div>
        </div>
        <Divider
          flexItem
          orientation="vertical"
          className="border-2 border-dashed border-slate-100"
        />
        <div className="min-w-full md:min-w-[370px] relative flex flex-col">
          <Typography
            variant="h5"
            className="font-semibold p-3 px-1 flex flex-row items-center justify-between"
          >
            Customer
            {!!selectedCustomer && (
              <IconButton
                color="error"
                onClick={() => setSelectedCustomer(null)}
              >
                <Iconify icon={"ic:baseline-delete-forever"} />
              </IconButton>
            )}
          </Typography>

          <div className="flex-1">
            {!!selectedCustomer ? (
              <div className="flex flex-col gap-2">
                <div>
                  <Typography variant="overline">Name</Typography>
                  <Typography variant="subtitle2" className="font-bold">
                    {selectedCustomer?.name || "N/A"}
                  </Typography>
                </div>
                <div>
                  <Typography variant="overline">Phone</Typography>
                  <Typography variant="subtitle2" className="font-bold">
                    {selectedCustomer?.phone || "N/A"}
                  </Typography>
                </div>
                <div>
                  <Typography variant="overline">Email</Typography>
                  <Typography variant="subtitle2" className="font-bold">
                    {selectedCustomer?.email || "N/A"}
                  </Typography>
                </div>
                <div>
                  <Typography variant="overline">Address</Typography>
                  <Typography variant="subtitle2" className="font-bold">
                    {selectedCustomer?.address || "N/A"}
                  </Typography>
                </div>
              </div>
            ) : (
              <>
                <Avatar
                  src={"/customer.svg"}
                  variant="square"
                  className="w-9/12 h-auto mx-auto"
                />
                <Select
                  bordered={false}
                  placeholder={"Search by Phone, Name, Email.."}
                  allowClear
                  showSearch
                  defaultActiveFirstOption
                  size="large"
                  onSelect={(_v, o) => setSelectedCustomer(o?.data)}
                  onClear={() => setCustomerSearch("")}
                  onSearch={(v) => setCustomerSearch(v)}
                  loading={isCustomerLoading}
                  options={customers}
                  filterOption={false}
                  className="w-full"
                  dropdownRender={(menu) => (
                    <>
                      {menu}

                      <Button
                        variant="contained"
                        fullWidth
                        className="mt-1"
                        startIcon={<Iconify icon={"material-symbols:add"} />}
                        onClick={() => onCloseCreateCustomer()}
                      >
                        Create New
                      </Button>
                    </>
                  )}
                />
                <CreateCustomer
                  open={openCreateCustomer}
                  onClose={onCloseCreateCustomer}
                />
              </>
            )}
            <Divider
              flexItem
              className="border-2 border-dashed border-slate-100 my-3"
            />
          </div>

          <div className={"flex flex-col gap-5"}>
            <div>
              <Typography variant={"caption"} className={"font-bold pr-2"}>
                Online
              </Typography>
              <Switch
                checked={online}
                size="small"
                className={`${online ? "bg-primary-400" : "bg-slate-600"}`}
                onChange={(e) => setOnline(e)}
              />
            </div>

            <div className={"flex flex-col gap-2"}>
              <Typography variant={"caption"} className={"font-bold"}>
                Payment Method
              </Typography>
              <Segmented
                className="w-full"
                options={[
                  {
                    label: (
                      <div
                        className={
                          "p-1 py-2 flex flex-col items-center justify-center gap-1"
                        }
                      >
                        <Icon>
                          <Iconify
                            icon={"mdi:cash"}
                            className="text-2xl text-teal-600"
                          />
                        </Icon>

                        <div className={"text-xs font-bold"}>Cash</div>
                      </div>
                    ),
                    value: "Cash",
                  },
                  {
                    label: (
                      <div
                        className={
                          "p-1 py-2 flex flex-col items-center justify-center gap-1"
                        }
                      >
                        <Icon>
                          <Iconify
                            icon={"ic:outline-credit-card"}
                            className="text-2xl text-blue-900"
                          />
                        </Icon>

                        <div className={"text-xs font-bold"}>Card</div>
                      </div>
                    ),
                    value: "Card",
                  },
                  {
                    label: (
                      <div
                        className={
                          "p-1 py-2 flex flex-col items-center justify-center gap-1"
                        }
                      >
                        <Icon>
                          <Iconify
                            icon={"arcticons:bkash"}
                            className="text-2xl text-pink-700"
                          />
                        </Icon>

                        <div className={"text-xs font-bold"}>BKash</div>
                      </div>
                    ),
                    value: "bKash",
                  },
                  {
                    label: (
                      <div
                        className={
                          "p-1 py-2 flex flex-col items-center justify-center gap-1"
                        }
                      >
                        <Icon>
                          <Iconify
                            icon={"mdi:cod"}
                            className="text-2xl text-amber-900"
                          />
                        </Icon>

                        <div className={"text-xs font-bold"}>COD</div>
                      </div>
                    ),
                    value: "COD",
                  },
                ]}
                onResize={undefined}
                onResizeCapture={undefined}
                value={payMethod}
                onChange={(e) => setPayMethod(e)}
              />
            </div>
            <div className="flex flex-row items-center gap-5">
              <Typography variant={"caption"} className={"font-bold"}>
                Discount
              </Typography>
              <InputNumber
                addonAfter={<Iconify icon={"tabler:currency-taka"} />}
                min={0}
                className={"max-w-[7rem]"}
                value={discount}
                onChange={(e) => setDiscount(e || 0)}
              />
            </div>
            <Divider
              flexItem
              className="border-2 border-dashed border-slate-100 my-3"
            />
            <Typography variant={"caption"} className={"font-bold"}>
              Paid
            </Typography>
            <div className="flex flex-row items-center justify-between gap-2">
              <InputNumber
                addonAfter={<Iconify icon={"tabler:currency-taka"} />}
                max={subTotal - discount + stitchCost}
                min={0}
                className={"w-full"}
                value={paid}
                onChange={(e) => setPaid(e || 0)}
              />
              <Dropdown.Button
                menu={{
                  items: [
                    {
                      key: "80mm",
                      label: "80mm",
                      children: [
                        {
                          key: "print",
                          label: "Print",
                          onClick: () => {
                            onInvoiceClose();
                            handlePrint();
                          },
                        },
                        {
                          key: "download",
                          label: "Download",
                          onClick: () => {
                            onInvoiceClose();
                            print("invoice-" + Date.now(), "jsx-template");
                            // handlePrint();
                          },
                        },
                      ],
                    },
                    {
                      key: "a4",
                      label: "A4",
                    },
                    {
                      key: "save",
                      label: "Confirm",
                      danger: true,
                      onClick: submitToSave,
                    },
                  ],
                }}
                className={"w-fit"}
                loading={orderLoading}
              >
                Invoice
              </Dropdown.Button>
            </div>
          </div>
        </div>
      </div>
      <Drawer
        anchor={"right"}
        open={open}
        onClose={onClose}
        PaperProps={{ className: "w-[95vw] max-w-[420px]" }}
      >
        <div className="flex flex-row items-center  gap-2  p-3 bg-slate-100">
          <Icon className="text-4xl">
            <Iconify icon={"game-icons:sewing-machine"} />
          </Icon>
          <Select
            bordered={false}
            placeholder={"Select Your Tailor"}
            allowClear
            showSearch
            defaultActiveFirstOption
            size="large"
            onClear={() => setTailorSearch("")}
            onSearch={(v) => setTailorSearch(v)}
            value={selectedTailor?.value}
            onSelect={(_v, o) => setSelectedTailor(o)}
            loading={isTailorLoading}
            options={tailors}
            filterOption={false}
            className="min-w-sm"
          />
        </div>
        {/* <div className="flex flex-row items-center justify-between gap-3 pl-2">
            <Icon className="text-3xl">
              
            </Icon>
            <Typography variant="h5" className="font-semibold">
              Tailor
            </Typography>
          </div> */}
        <Spin spinning={searchProducts}>
          {Object.values(posProducts)?.length > 0 ? (
            <List>
              {Object.values(posProducts)?.map?.(
                (product: any) =>
                  !!product?.tailor && (
                    <ListItem key={product?._id} className="gap-2">
                      <ListItemText
                        primary={product?.product?.name}
                        secondary={`${product?.product?.category?.name}/${product?.product?.subcategory?.name}`}
                        primaryTypographyProps={{
                          className: "font-bold",
                        }}
                        secondaryTypographyProps={{
                          className: "text-xs font-bold",
                        }}
                      />
                      <Input
                        className="max-w-[5rem]"
                        value={product?.tailor?.size}
                        onChange={(e) => {
                          setPosProducts((p) => ({
                            ...p,
                            [product._id]: {
                              ...product,
                              tailor: {
                                ...product.tailor,
                                size: e.target.value,
                              },
                            },
                          }));
                        }}
                      />
                      <InputNumber
                        addonAfter={<Iconify icon={"tabler:currency-taka"} />}
                        min={0}
                        className={"max-w-[7rem]"}
                        value={product?.tailor?.fee}
                        onChange={(fee) => {
                          setPosProducts((p) => ({
                            ...p,
                            [product._id]: {
                              ...product,
                              tailor: {
                                ...product.tailor,
                                fee,
                              },
                            },
                          }));
                        }}
                      />

                      <IconButton
                        size="small"
                        color="error"
                        className="rounded"
                        onClick={() => {
                          setPosProducts((p) => ({
                            ...p,
                            [product._id]: {
                              ...product,
                              tailor: undefined,
                            },
                          }));
                        }}
                      >
                        <Iconify icon={"ic:baseline-delete-forever"} />
                      </IconButton>
                    </ListItem>
                  )
              )}
            </List>
          ) : (
            <Avatar
              src={"/boxs.svg"}
              variant="square"
              className="w-9/12 max-w-md h-auto mx-auto my-5"
            />
          )}
        </Spin>
      </Drawer>{" "}
      {/* </Container> */}
      <Dialog open={openInvoice} onClose={onInvoiceClose}>
        <Preview id={"jsx-template"}>
          <div ref={printRef}>
            <PrintableArea
              {...{
                posProducts,
                subTotal,
                stitchCost,
                paid,
                discount,
                selectedCustomer,
              }}
            />
          </div>
        </Preview>
        <DialogActions>
          <Button onClick={() => handlePrint()}>Print</Button>
          <Button
            onClick={() => print("invoice-" + Date.now(), "jsx-template")}
          >
            Download
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const PrintableArea: React.FC<{
  posProducts: {
    [id: string]: any;
  };
  subTotal: number;
  stitchCost: number;
  discount: number;
  paid: number;
  selectedCustomer: {
    [id: string]: any;
  };
}> = ({ posProducts, selectedCustomer, ...others }) => {
  return (
    <Box
      sx={{
        "& *": {
          // fontFamily: "monospace",
          fontWeight: "700",
        },
      }}
      className={"font-black"}
    >
      <div className="flex flex-row items-center justify-start gap-2">
        <Avatar
          src={"/favicon.svg"}
          variant={"square"}
          sx={{
            height: "50px",
            width: "50px",
            background: "transparent",
            borderColor: "none",
          }}
        />

        <div className="flex flex-col">
          <b className="text-lg">Fascino</b>
          <b className={"text-xs"}>017*********</b>
          <b className={"text-xs"}>Address</b>
        </div>
      </div>
      <Divider flexItem textAlign="left" className={"w-full mt-3"}>
        <b className="text-xs">Bill To</b>
      </Divider>
      <div className="flex flex-col gap-1 w-full m-2">
        <b className="text-xs">{selectedCustomer?.name}</b>
        <b className={"text-xs"}>{selectedCustomer?.phone}</b>
        <b className={"text-xs"}>{selectedCustomer?.email}</b>
        <b className={"text-xs"}>{selectedCustomer?.address}</b>
      </div>
      <Divider />

      <List>
        <ListItem className={"justify-between text-xs"}>
          <b>{"Name"}</b>
          <b>{"Price"}</b>
        </ListItem>

        {Object.values(posProducts)?.map?.((product: any) => (
          <ListItem key={product?._id} className={"justify-between text-xs"}>
            <b>{product?.product?.name}</b>
            <b>{product?.product?.price} ৳</b>
          </ListItem>
        ))}
      </List>

      <Divider />

      <div className="flex flex-row justify-end">
        <div className="flex flex-col  items-end gap-2 m-4 w-[95vw] max-w-[200px] text-xs">
          <div className="w-full flex flex-row items-center gap-4 justify-between ">
            <p>Subtotal : </p>
            <b>{others?.subTotal} ৳</b>
          </div>
          {!!others?.stitchCost && (
            <div className="w-full flex flex-row items-center gap-4 justify-between">
              <b>Stitch : </b>
              <b>{others?.stitchCost} ৳</b>
            </div>
          )}
          <div className="w-full flex flex-row items-center gap-4 justify-between">
            <b>Discount : </b>
            <b>{others?.discount} ৳</b>
          </div>
          <div className="w-full flex flex-row items-center gap-4 justify-between">
            <b>Total : </b>
            <b>{others?.subTotal - others?.discount + others?.stitchCost} ৳</b>
          </div>
          <div className="w-full flex flex-row items-center gap-4 justify-between">
            <b>Paid : </b>
            <b>{others?.paid} ৳</b>
          </div>
          {!!(
            others?.subTotal -
            others?.discount -
            others?.paid +
            others?.stitchCost
          ) && (
            <div className="w-full flex flex-row items-center gap-4 justify-between">
              <b>Due : </b>
              <b>
                {others?.subTotal -
                  others?.discount -
                  others?.paid +
                  others?.stitchCost}{" "}
                ৳
              </b>
            </div>
          )}
        </div>
      </div>
      <Avatar
        variant="square"
        src={"/tam.svg"}
        className={"h-auto w-20 mx-auto"}
      />
    </Box>
  );
};

export default POS;
