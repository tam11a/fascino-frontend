import { IUserId } from "@/types";

export type IToken = string | null;

export type IUser = {
	_id: IUserId;
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
