"use client";

import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { theme } from "../theme";
import TopNav from "@/components/TopNav";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({ children }: any) {
  return (
    <html>
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthProvider>
            <TopNav />
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
