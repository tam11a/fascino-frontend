import React, { lazy } from "react";

import theme from "@styles/theme";
import ThemeProvider from "@mui/system/ThemeProvider";
import { StyleProvider } from "@ant-design/cssinjs";
import { ConfigProvider } from "antd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import CacheBuster from "react-cache-buster";

const BaseRoutes = lazy(() => import("./routes"));

const AuthProvider = lazy(() =>
	import("@/contexts/AuthContext").then((module) => ({
		default: module.AuthProvider,
	}))
);

const query = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

import { version } from "../package.json";

const App: React.FC = () => {
	const isProduction = import.meta.env.VITE_NODE_ENV === "production";
	return (
		<CacheBuster
			currentVersion={version}
			isEnabled={isProduction} //If false, the library is disabled.
			isVerboseMode={false} //If true, the library writes verbose logs to console.
			loadingComponent={
				<>
					<div className="h-full w-full flex flex-row items-center justify-center">
						<p className="font-bold">Updating to New Version...</p>
					</div>
				</>
			} //If not pass, nothing appears at the time of new version check.
			metaFileDirectory={"."} //If public assets are hosted somewhere other than root on your server.
		>
			<QueryClientProvider client={query}>
				<ThemeProvider theme={theme}>
					<StyleProvider hashPriority="high">
						<ConfigProvider
							theme={{
								token: {
									colorPrimary: theme.palette.primary.main,
									borderRadius: 4,
									fontFamily: theme.typography.fontFamily,
								},
							}}
						>
							{/* <CssBaseline /> */}
							<BrowserRouter>
								<AuthProvider>
									<BaseRoutes />
								</AuthProvider>
							</BrowserRouter>
						</ConfigProvider>
					</StyleProvider>
				</ThemeProvider>
			</QueryClientProvider>
		</CacheBuster>
	);
};

export default App;
