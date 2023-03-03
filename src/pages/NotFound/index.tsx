import { Avatar } from "@mui/material";
import React from "react";

const NotFound: React.FC = () => {
	return (
		<div className="h-full flex flex-col items-center justify-center gap-2">
			<Avatar
				src={"/404.svg"}
				sx={{
					width: "90%",
					maxWidth: "780px",
					height: "auto",
				}}
				variant={"square"}
			/>
		</div>
	);
};

export default NotFound;
