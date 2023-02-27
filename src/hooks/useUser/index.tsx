import React from "react";
import AuthContext from "@/contexts/AuthContext";

const useUser = () => {
	const { user } = React.useContext(AuthContext);
	return {
		...user,
	};
};

export default useUser;
