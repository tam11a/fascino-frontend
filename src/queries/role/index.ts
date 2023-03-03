import instance from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const getRoles = () => {
	return instance.get(`/role`, {
		params: {
			limit: 1000000,
		},
	});
};

export const useGetRoles = () => {
	return useQuery(["get-all-role"], () => getRoles(), {});
};

const getRoleById = (id: any) => {
	return instance.get(`/role/${id}`, {
		// params: {},
	});
};

export const useGetRoleById = (id: any) => {
	return useQuery(["get-all-role-by-id", id], () => getRoleById(id), {
		enabled: !!id,
	});
};

const getAllPermissions = () =>
	instance.get("/permission", {
		params: {
			limit: 1000000,
		},
	});

export const useGetAllPermissions = () =>
	useQuery(["get-all-permission"], getAllPermissions, {
		select: (data) => data?.data?.data || [],
	});

const updateRole = ({
	roleId,
	data,
}: {
	roleId: string | undefined;
	data: {
		permissions?: string[];
		name?: string;
		description?: string;
	};
}) => {
	return instance.patch(`/role/${roleId}`, data);
};

export const useUpdateRole = () => {
	const queryClient = useQueryClient();
	return useMutation([], updateRole, {
		onSuccess: () => {
			queryClient.invalidateQueries(["get-all-role"]);
			queryClient.invalidateQueries(["get-all-role-by-id"]);
			queryClient.invalidateQueries(["validate"]);
		},
	});
};

const createRole = ({
	data,
}: {
	data: {
		permissions?: string[];
		name?: string;
		description?: string;
	};
}) => {
	return instance.post(`/role`, data);
};

export const useCreateRole = () => {
	const queryClient = useQueryClient();
	return useMutation([], createRole, {
		onSuccess: () => queryClient.invalidateQueries(["get-all-role"]),
	});
};
