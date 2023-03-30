export type IUpdateSubcategory = {
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

export type ICreateSubcategory = {
  name: string;
  description: string;
  category: string;
};
