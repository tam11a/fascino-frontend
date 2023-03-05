export type IRole = {
  _id: string;
  name: string;
  roleType: string;
  description: boolean;
  modifiedOn?: string;
  modifiedBy?: string;
  createdOn?: string;
  createdBy?: ICreatedBy[];
  permissions: IPermission[];
};

export type IPermission = {
  _id?: number;
  keyword?: string;
  description?: string;
  isActive?: boolean;
};

export type ICreatedBy = {
  _id?: string;
  userName?: string;
  firstName?: string;
  lastName?: boolean;
  fullName?: string;
};
