"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import DynamicField from "./DynamicField";
import { useForm } from "react-hook-form";
import { Container, Typography, Stack, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function SignupForm() {
    const [fields, setFields] = useState<any[]>([]);
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const { login } = useAuth();
    const router = useRouter();   // <-- added this

    useEffect(() => {
        async function loadConfig() {
            const res = await api.get("/config?name=SignupForm");
            const data = res.data.data.data;
            setFields(data);
            localStorage.setItem("formConfig", JSON.stringify(data));
        }
        loadConfig();
    }, []);

    const onSubmit = async (formData: any) => {
        const res = await api.post("/users/signup", formData);

        alert("Signup successful!");

        // 👉 Redirect to login page
        router.push("/login");
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" sx={{ my: 3 }}>
                Dynamic Signup Form
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2}>
                    {fields.map((field) => (
                        <DynamicField
                            key={field.id}
                            field={field}
                            register={register}
                            errors={errors}
                            watch={watch}
                        />
                    ))}

                    <Button type="submit" variant="contained">
                        Submit
                    </Button>
                </Stack>
            </form>
        </Container>
    );
}
