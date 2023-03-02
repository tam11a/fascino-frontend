export type IUpdateEmployee = {
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

export type ICreateEmployee = {
  userName: string;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  phone: string;
  password: string;
  role: number;
};
