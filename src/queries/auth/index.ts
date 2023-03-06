// Instance
import instance, { updateInstanceAuthorization } from "@/services";

// Third Party
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Types
import {
  ILogin,
  //  ISignup,
  IUpdateUser,
} from "./types";
import { IUserId } from "@/types";

// Login function with instance
const login = (data: ILogin) => {
  return instance.post("/auth/login", { ...data });
};
export const useLogin = () => {
  return useMutation(login);
};

//Logout function with instance
const logout = () => {
  return instance.put("/auth/logout");
};
export const useLogout = () => {
  return useMutation(logout);
};

// Validation function with instance
const getValidateUser = () => {
  updateInstanceAuthorization();
  return instance.get("/auth/validate");
};

export const useGetValidation = (token: string | null) => {
  return useQuery(["validate", token], getValidateUser, {
    enabled: !!token,
    retry: 1,
    onError: async (error: { request: { status: number } }) => {
      return error.request.status;
    },
    // networkMode: "offlineFirst",
  });
};

// User information update
const updateUserInfo = ({
  userId,
  data,
}: {
  userId: IUserId;
  data: IUpdateUser | any;
}) => {
  return instance.patch(`/auth/update`, {
    ...data,
  });
};

export const useUpdateUserInfo = () => {
  const query = useQueryClient();
  return useMutation([], updateUserInfo, {
    onSuccess: () => {
      query.invalidateQueries(["validate"]);
    },
  });
};

const updatePassword = (data: {
  phone?: string;
  currentPassword?: string;
  password?: string;
  token: string | null;
}) => {
  return instance.put(`/update-password`, {
    ...data,
  });
};

export const useUpdatePassword = () => useMutation(updatePassword);

const sendOTP = (email: string) =>
  instance.put(`auth/forgot-password`, {
    email,
  });

export const useSendOTP = () => useMutation(sendOTP);

const resetPassword = (data: {
  token: string;
  otp: string;
  password: string;
}) => instance.put(`auth/reset-password`, { ...data });

export const useResetPassword = () => useMutation(resetPassword);
