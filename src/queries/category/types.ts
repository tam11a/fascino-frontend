export type IUpdateCategory = {
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

export type ICreateCategory = {
  name: string;
  description: string;
};
