import React, { lazy } from "react";

import theme from "@styles/theme";
import ThemeProvider from "@mui/system/ThemeProvider";
import { StyleProvider } from "@ant-design/cssinjs";
import { CssBaseline } from "@mui/material";
import { ConfigProvider } from "antd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";

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

const App: React.FC = () => {
  return (
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
            <CssBaseline />
            <BrowserRouter>
              <AuthProvider>
                <BaseRoutes />
              </AuthProvider>
            </BrowserRouter>
          </ConfigProvider>
        </StyleProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
