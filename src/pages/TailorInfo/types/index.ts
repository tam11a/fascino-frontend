export type ITailor = {
  _id: string;
  name: string;
  ownerName: string;
  address: string;
  phone: string;
  createdBy: ICreatedBy[];
  updatedBy: IUpdatedBy[];
};

export type ICreatedBy = {
  _id: string;
  userName: string;
  firstName: string;
  lastName: string;
  fullName: string;
};

export type IUpdatedBy = {
  _id: string;
  userName: string;
  firstName: string;
  lastName: string;
  fullName: string;
};
