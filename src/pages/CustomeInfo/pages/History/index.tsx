import { Container, Typography } from "@mui/material";
import { Empty } from "antd";
import React from "react";

const History: React.FC = () => {
	return (
		<Container
			maxWidth={"xs"}
			className="flex flex-col gap-4 py-4"
		>
			<Typography
				variant="h6"
				className="font-semibold"
			>
				Recently Purchased
			</Typography>

			<div className="flex flex-col items-center justify-center border-2 border-dashed p-3 py-12 mb-6">
				<Empty />
			</div>
		</Container>
	);
};

export default History;
