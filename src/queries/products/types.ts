export type IUpdateProduct = {
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

export type ICreateProduct = {
  name: string;
  category: string;
  subcategory: string;
  price: number;
};
