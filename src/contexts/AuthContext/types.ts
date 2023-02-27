import { IUserId } from "@/types";

export type IToken = string | null;

export type IUser = {
	userId: IUserId;
	name: string;
	accessRights: string[];
	username: string;
};

export type IAuthContext = {
	isLoggedIn: boolean;
	token: IToken;
	setToken: (token: IToken, remember: boolean | false) => void;
	user: IUser;
	isLoading: boolean | false;
	login: (
		username: string,
		password: string,
		remember: boolean | false
	) => void;
	isLoginLoading: boolean;
	logout: () => void;
	isLogoutLoading: boolean;
};
