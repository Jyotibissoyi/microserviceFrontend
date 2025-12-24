"use client";

import { Container, Typography, Paper, Stack } from "@mui/material";
import { useEffect, useState } from "react";

export default function ProfilePage() {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const u = localStorage.getItem("user");
        if (u) setUser(JSON.parse(u));
    }, []);

    if (!user) return <div>No user logged in</div>;

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" sx={{ my: 3 }}>
                User Profile
            </Typography>

            <Paper sx={{ p: 3 }}>
                <Stack spacing={2}>
                    <Typography>Name: {user.fullName}</Typography>
                    <Typography>Email: {user.email}</Typography>
                    <Typography>Gender: {user.gender}</Typography>
                </Stack>
            </Paper>
        </Container>
    );
}
