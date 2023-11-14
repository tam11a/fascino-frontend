import DatePicker from "@components/antd/DatePicker";
import Iconify from "@components/iconify";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	IconButton,
	ListItemText,
	Typography,
} from "@mui/material";
import { usePaginate } from "@tam11a/react-use-hooks";
import { Select } from "antd";
import moment from "moment";
import React from "react";
import instance from "@/services";

const DownloadDialog: React.FC<{ open: boolean; onClose: () => void }> = ({
	open,
	onClose,
}) => {
	const {
		search,
		setSearch,
		// limit,
		// setLimit,
		// page,
		// setPage,
		setFilterField,
		watch,
	} = usePaginate();

	// const [inputValue, setInputValue] = React.useState(0);
	// const onChange = (value: number | null) => {
	// 	if (isNaN(value || NaN)) {
	// 		return;
	// 	}
	// 	setInputValue(value || NaN);
	// };

	const downloadNow = async () => {
		const BASE = instance.defaults.baseURL;

		const url = new URL(
			`${
				BASE?.endsWith("/") ? BASE.slice(0, BASE.length - 1) : BASE
			}/order/download?${new URLSearchParams(
				JSON.parse(
					JSON.stringify({
						from_date: watch("range")?.[0],
						to_date: watch("range")?.[1],
						sale_type: watch("type"),
					})
				)
			).toString()}`
		);

		window.open(url, "_blank");
	};

	return (
		<>
			<Dialog
				open={open}
				onClose={onClose}
				PaperProps={{
					className: "w-[95vw] max-w-[520px]",
				}}
			>
				<div className="flex flex-row items-center justify-between p-2 px-6">
					<ListItemText
						primary={"Download CSV File"}
						secondary={"Based on different filters"}
					/>

					<IconButton
						size={"small"}
						onClick={onClose}
					>
						<Iconify icon={"ci:close-md"} />
					</IconButton>
				</div>
				<DialogContent
					dividers
					className="flex flex-col items-center"
				>
					<div className="flex flex-col items-start justify-between w-full max-w-sm">
						<Typography variant="overline">Filter Date</Typography>
						<DatePicker.RangePicker
							bordered={true}
							size={"large"}
							allowClear
							allowEmpty={[true, true]}
							className="w-full"
							presets={[
								{
									label: "Today",
									value: [moment(), moment()],
								},
								{
									label: "Yesterday",
									value: [moment().add(-1, "days"), moment().add(-1, "days")],
								},
								{
									label: "Last 7 Days",
									value: [moment().add(-7, "days"), moment()],
								},
								{
									label: "Last 30 Days",
									value: [moment().add(-30, "days"), moment()],
								},
								{
									label: "Last 6 Months",
									value: [moment().add(-3, "months"), moment()],
								},
								{
									label: "Last 1 Year",
									value: [moment().add(-1, "year"), moment()],
								},
							]}
							onChange={(v) => {
								// if (
								// 	moment(v?.[0]).toISOString() === moment(v?.[1]).toISOString()
								// ) {
								// 	setFilterField("range", [undefined, undefined]);
								// } else {
								setFilterField("range", [
									v?.[0]
										? moment(v?.[0]).startOf("day").toISOString()
										: undefined,
									v?.[1]
										? moment(v?.[1]).endOf("day").toISOString()
										: undefined,
								]);
								// }
							}}
						/>
					</div>
					<div className="flex flex-col py-2 w-full max-w-sm">
						<Typography variant="overline">Filter Sale Type</Typography>
						<Select
							placeholder={"Select Type"}
							dropdownMatchSelectWidth={false}
							size="large"
							className="w-full"
							value={watch("type")}
							allowClear
							onChange={(v) => setFilterField("type", v)}
							options={
								[
									{ value: "online", label: "Online" },
									{ value: "offline", label: "Offline" },
								] || []
							}
							showSearch
							filterOption={false}
							searchValue={search}
							onSearch={(v) => setSearch(v)}
							onClear={() => setFilterField("type", undefined)}
						/>
					</div>
					{/* <div className="flex flex-col py-2 w-full max-w-sm">
            <Typography variant="overline">Download Limit</Typography>
            <div className="flex flex-row items-center gap-5 -mt-1">
              <Slider
                // range={{ draggableTrack: true }}
                max={1000}
                min={0}
                marks={{
                  0: "0",
                  100: "100",
                  500: "500",
                  1000: "1000",
                }}
                value={inputValue}
                onChange={onChange}
                className="flex-1"
              />
              <InputNumber
                min={0}
                max={1000}
                // style={{ margin: "" }}
                // step={0.01}
                value={inputValue}
                onChange={onChange}
              />
            </div>
          </div> */}
				</DialogContent>
				<DialogActions>
					<Button
						variant="outlined"
						size="small"
						onClick={onClose}
					>
						Cancel
					</Button>
					<Button
						variant="contained"
						size="small"
						onClick={downloadNow}
					>
						Download
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default DownloadDialog;
