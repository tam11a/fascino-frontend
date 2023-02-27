import React from "react";

import {
	Paper,
	Avatar,
	Typography,
	Stack,
	Button,
	Container,
} from "@mui/material";

import { Input, Checkbox } from "antd";

import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

import { joiResolver } from "@hookform/resolvers/joi";
import { Controller, useForm, FieldValues } from "react-hook-form";
import { loginResolver } from "./resolver";
import AuthContext from "@/contexts/AuthContext";
import ErrorSuffix from "@components/antd/ErrorSuffix";
import moment from "moment";

const Login: React.FC = () => {
	const { login, isLoginLoading } = React.useContext(AuthContext);

	const {
		// reset,
		handleSubmit,
		control,
	} = useForm({
		resolver: joiResolver(loginResolver),
		defaultValues: {
			email: "",
			password: "",
			remember: true,
		},
	});

	const onValid = async ({ email, password, remember }: FieldValues) => {
		login(email, password, remember);
	};

	return (
		<Container
			maxWidth={"sm"}
			className="min-h-screen flex flex-col items-center justify-between relative py-2"
		>
			<div />
			<div className="flex flex-col items-center">
				<Avatar
					src={"/logo.svg"}
					variant={"square"}
					alt={"logo"}
					className="w-full h-auto max-w-[180px] mb-4"
				/>
				<form onSubmit={handleSubmit(onValid)}>
					<Paper
						elevation={0}
						sx={{
							p: 2,
							width: "95vw",
							maxWidth: "350px",
							"& > *": { my: 0.5 },
						}}
						className="shadow shadow-slate-300"
					>
						<Typography>Phone Number</Typography>

						<Controller
							control={control}
							name={"email"}
							rules={{ required: true }}
							render={({
								field: { onChange, onBlur, value },
								fieldState: { error },
							}) => (
								<Input
									prefix={
										<Icon
											icon="ph:phone"
											color="#999"
											className="mr-1 text-xl"
										/>
									}
									placeholder={"Phone"}
									size={"large"}
									onChange={onChange}
									onBlur={onBlur}
									value={value}
									status={error ? "error" : ""}
									suffix={<ErrorSuffix error={error} />}
								/>
							)}
						/>

						<Controller
							control={control}
							name={"password"}
							rules={{ required: true }}
							render={({
								field: { onChange, onBlur, value },
								fieldState: { error },
							}) => (
								<>
									<Typography className="flex flex-row items-center gap-1">
										Password
										<ErrorSuffix
											error={error}
											size="small"
										/>
									</Typography>
									<Input.Password
										prefix={
											<Icon
												icon="ri:lock-password-line"
												color="#999"
												className="mr-1 text-xl"
											/>
										}
										placeholder={"Password"}
										size="large"
										onChange={onChange}
										onBlur={onBlur}
										value={value}
										status={error ? "error" : ""}
										// suffix={}
									/>
								</>
							)}
						/>

						<Stack
							direction={"row"}
							justifyContent={"space-between"}
							alignItems={"center"}
							className={"py-1 mb-2"}
						>
							<Controller
								control={control}
								name={"remember"}
								render={({ field: { onChange, value } }) => (
									<Checkbox
										onChange={onChange}
										checked={value}
									>
										Remember me
									</Checkbox>
								)}
							/>

							<Link to={"/recover"}>
								<Typography variant="caption">Forgot Password?</Typography>
							</Link>
						</Stack>
						<Button
							variant="contained"
							fullWidth
							size="large"
							type={"submit"}
							disabled={isLoginLoading}
						>
							Log In
						</Button>
					</Paper>
				</form>
			</div>
			<Stack className="flex flex-col items-center">
				<Stack className="flex flex-row items-center gap-1 ">
					<Typography
						component={Link}
						to={"/privacy-policy"}
						variant="caption"
					>
						Privacy Policy
					</Typography>{" "}
					|
					<Typography
						variant="caption"
						component={Link}
						to={"/terms-and-conditions"}
					>
						Terms and Conditions
					</Typography>
				</Stack>
				<Stack className="flex flex-row items-center gap-1">
					<Typography variant="caption">
						©{moment().format("yyyy")} All Rights Reserved by ---
					</Typography>
				</Stack>
			</Stack>
		</Container>
	);
};

export default Login;
