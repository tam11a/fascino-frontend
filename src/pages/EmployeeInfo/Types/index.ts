export type IEmployee = {
  _id: string;
  firstName: string;
  lastName: string;
  permissions: string[];
  userName: string;
  phone: string;
  email: string;
  gender: "male" | "female" | "others";
  role: {
    name: string;
    _id: string;
  };
};
