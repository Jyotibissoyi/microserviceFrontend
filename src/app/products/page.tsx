"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, CardContent, Button, Typography, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import RequireAuth from "@/components/RequireAuth";

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const router = useRouter();

    useEffect(() => {
        axios.get("http://localhost:3020/products").then(res => {
            setProducts(res.data);
        });
    }, []);

    const addToCart = (product) => {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        cart.push({ ...product, quantity: 1 });
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Added to cart");
    };

    return (
        <RequireAuth>
            <Container>
                <Typography variant="h4">Products</Typography>
                <Stack spacing={2}>
                    {products.map(p => (
                        <Card key={p._id}>
                            <CardContent>
                                <Typography>{p.name}</Typography>
                                <Typography>₹ {p.price}</Typography>
                                <Button onClick={() => addToCart(p)}>Add to Cart</Button>
                            </CardContent>
                        </Card>
                    ))}
                </Stack>

                <Button onClick={() => router.push("/cart")}>Go to Cart</Button>
            </Container>
        </RequireAuth>
    );
}
