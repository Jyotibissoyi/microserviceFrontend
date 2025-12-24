"use client";

import { useEffect, useState } from "react";
import { Container, Button, Typography, Stack } from "@mui/material";
import { api } from "@/lib/api";

export default function CartPage() {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const c = JSON.parse(localStorage.getItem("cart") || "[]");
        setCart(c);
    }, []);

    const createOrder = async () => {
        const user = JSON.parse(localStorage.getItem("user"));

        const products = cart.map(p => ({
            productId: p._id,
            quantity: 1
        }));

        await api.post("/orders", {
            customerName: user.fullname,
            email: user.email,
            products
        });

        localStorage.removeItem("cart");
        alert("Order created!");
    };

    return (
        <Container>
            <Typography variant="h4">Cart</Typography>
            <Stack spacing={2}>
                {cart.map(p => (
                    <Typography key={p._id}>{p.name} - ₹{p.price}</Typography>
                ))}
                <Button onClick={createOrder} variant="contained">Place Order</Button>
            </Stack>
        </Container>
    );
}
