"use client";

import { useForm } from "react-hook-form";
import { api } from "@/lib/api";
import { Container, TextField, Button, Typography, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { isLoggedIn } from "@/lib/auth";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
    const { register, handleSubmit } = useForm();
    const router = useRouter();
    const { login } = useAuth();

    useEffect(() => {
        if (isLoggedIn()) {
            router.push("/products");
        }
    }, []);

    const onSubmit = async (data) => {
        const res = await api.post("/users/login", data);

        if (!res.data.status) {
            alert("User not found");
            return;
        }

        login(res.data.user);
        router.push("/products")
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" sx={{ my: 3 }}>
                Login
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2}>
                    <TextField label="Email" {...register("email", { required: true })} />
                    <Button type="submit" variant="contained">
                        Login
                    </Button>

                    {/* 👇 Add this */}
                    <Button
                        variant="text"
                        onClick={() => router.push("/")}
                    >
                        Don’t have an account? Signup
                    </Button>
                </Stack>
            </form>
        </Container>
    );
}
