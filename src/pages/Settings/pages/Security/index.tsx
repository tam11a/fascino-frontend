import React from "react";
import {
	Button,
	Container,
	Divider,
	Icon,
	Tooltip,
	Typography,
} from "@mui/material";
import { Input } from "antd";
import { AiFillInfoCircle } from "react-icons/ai";
import { Controller, FieldValues, useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
import { updatePasswordResolver } from "./resolver";
import useUser from "@/hooks/useUser";
import { message } from "@components/antd/message";
// import handleResponse from "@/utilities/handleResponse";
// import { useUpdatePassword } from "@queries/auth";
import useAuth from "@/hooks/useAuth";
import { joiResolver } from "@hookform/resolvers/joi";
import ErrorSuffix from "@components/antd/ErrorSuffix";

const Security: React.FC = () => {
	const user = useUser();
	const { logout } = useAuth();
	const [messageApi, contextHolder] = message.useMessage();
	const { handleSubmit, setValue, control } = useForm({
		resolver: joiResolver(updatePasswordResolver),
	});

	// const { mutateAsync: updatePassword, isLoading: isSubmitting } =
	//   useUpdatePassword();

	React.useEffect(() => {
		setValue("phone", user.phone);
	}, [user]);

	const onValid = async (d: FieldValues) => {
		messageApi.open({
			type: "loading",
			content: `Creating new password...`,
			duration: 0,
		});
		//   const res = await handleResponse(
		//     () => updatePassword({ ...d, token: localStorage.getItem("token") }),
		//     [204]
		//   );
		//   messageApi.destroy();
		//   if (res.status) {
		//     messageApi.success("Password updated successfully!");
		//     reset({
		//       phone: user.phone,
		//     });
		//   } else messageApi.error(res.message);
		// };
	};

	return (
		<Container maxWidth={"xs"}>
			{contextHolder}
			<Typography
				variant="h6"
				className="pt-5"
			>
				Change Password
			</Typography>
			<form
				className="py-2"
				onSubmit={handleSubmit(onValid)}
			>
				<Typography
					variant="overline"
					className="flex flex-row items-center gap-1 mt-2"
				>
					Current Password
				</Typography>
				<Controller
					control={control}
					name={"currentPassword"}
					render={({
						field: { onChange, onBlur, value },
						fieldState: { error },
					}) => (
						<Input.Password
							placeholder="Current Password"
							size="large"
							onChange={onChange}
							onBlur={onBlur}
							value={value}
							status={error ? "error" : ""}
						/>
					)}
				/>

				<Controller
					control={control}
					name={"password"}
					render={({
						field: { onChange, onBlur, value },
						fieldState: { error },
					}) => (
						<>
							<Typography
								variant="overline"
								className="flex flex-row items-center gap-1 mt-2"
							>
								New Password
								{error ? (
									<ErrorSuffix error={error} />
								) : (
									<Tooltip
										title="Password should be atleast 6 characters long."
										arrow
										placement="right"
									>
										<Icon
											color={"action"}
											className="text-base mb-1"
										>
											<AiFillInfoCircle />
										</Icon>
									</Tooltip>
								)}
							</Typography>
							<Input.Password
								placeholder="New Password"
								size="large"
								onChange={onChange}
								onBlur={onBlur}
								value={value}
								status={error ? "error" : ""}
							/>
						</>
					)}
				/>

				<Controller
					control={control}
					name={"cpassword"}
					render={({
						field: { onChange, onBlur, value },
						fieldState: { error },
					}) => (
						<>
							<Typography
								variant="overline"
								className="flex flex-row items-center gap-1 mt-2"
							>
								Confirm New Password
								{error ? (
									<ErrorSuffix error={error} />
								) : (
									<Tooltip
										title="Re-enter your new password"
										arrow
										placement="right"
									>
										<Icon
											color={"action"}
											className="text-base mb-1"
										>
											<AiFillInfoCircle />
										</Icon>
									</Tooltip>
								)}
							</Typography>
							<Input.Password
								placeholder={"Confirm New Password"}
								size="large"
								onChange={onChange}
								onBlur={onBlur}
								value={value}
								status={error ? "error" : ""}
							/>
						</>
					)}
				/>
				<Button
					size="large"
					variant="contained"
					fullWidth
					className="mt-5"
					type="submit"
					// disabled={isSubmitting}
					disabled
				>
					Create New Password
				</Button>
			</form>
			<Divider />
			<Button
				size="large"
				variant="contained"
				fullWidth
				className="mt-2"
				color={"error"}
				onClick={logout}
			>
				Logout
			</Button>
		</Container>
	);
};

export default Security;
