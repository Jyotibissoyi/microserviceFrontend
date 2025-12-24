"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Container, Typography, Paper } from "@mui/material";

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        api.get("/orders").then(res => setOrders(res.data));
    }, []);

    return (
        <Container>
            <Typography variant="h4">Orders</Typography>

            {orders.map(o => (
                <Paper key={o._id} sx={{ p: 2, my: 2 }}>
                    <Typography>{o.customerName}</Typography>
                    <Typography>Total: ₹{o.totalAmount}</Typography>

                    {o.products.map(p => (
                        <Typography key={p.productId}>
                            {p.name} x {p.quantity}
                        </Typography>
                    ))}
                </Paper>
            ))}
        </Container>
    );
}
