"use client";

import { AppBar, Toolbar, Button, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function TopNav() {
    const router = useRouter();
    const { user, logout } = useAuth();

    if (!user) return null;

    return (
        <AppBar position="static">
            <Toolbar>
                <Stack direction="row" spacing={2}>
                    <Button color="inherit" onClick={() => router.push("/products")}>Products</Button>
                    <Button color="inherit" onClick={() => router.push("/cart")}>Cart</Button>
                    <Button color="inherit" onClick={() => router.push("/orders")}>Orders</Button>
                    <Button color="inherit" onClick={() => router.push("/profile")}>Profile</Button>
                    <Button color="inherit" onClick={() => {
                        logout();
                        router.push("/login");
                    }}>Logout</Button>
                </Stack>
            </Toolbar>
        </AppBar>
    );
}
