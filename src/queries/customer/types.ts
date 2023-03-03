export type IUpdateCustomer = {
  firstName: string;
  lastName: string;
  type: string;
  userName: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  vendorID: number;
  roleID: number;
  createdBy: string;
};

export type ICreateCustomer = {
  name: string;
  phone: string;
  address: string;
  email: string;
  gender: "male" | "female" | "others";
  dob: Date;
  bank: string;
  bkash: string;
};
