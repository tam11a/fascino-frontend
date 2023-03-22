import Iconify from "@components/iconify";
import { Container, Icon } from "@mui/material";
import { Badge, FloatButton, Select } from "antd";
import React from "react";

const POS: React.FC = () => {
	return (
		<Container className="py-4">
			<div className="relative flex flex-row items-center justify-between gap-2 p-3 bg-slate-100 rounded-md">
				<div className="flex flex-row items-center justify-between gap-2 pl-2">
					<Icon className="text-4xl">
						<Iconify icon={"mdi:shop-outline"} />
					</Icon>
					<Select
						bordered={false}
						placeholder={"Select Your Branch"}
						showSearch
						defaultActiveFirstOption
						size="large"
					/>
				</div>
				<FloatButton.Group
					className="relative top-0 left-0"
					shape="square"
				>
					<Badge count={12}>
						<FloatButton icon={<Iconify icon="game-icons:sewing-machine" />} />
					</Badge>
				</FloatButton.Group>
			</div>
		</Container>
	);
};

export default POS;
