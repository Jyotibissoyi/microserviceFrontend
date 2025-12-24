"use client";

import SignupForm from "@/components/SignupForm";
import { Button, Stack, Container } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Stack spacing={2}>

        <SignupForm />

        <Button variant="outlined" onClick={() => router.push("/login")}>
          Already have an account? Login
        </Button>

        {/* <Button variant="contained" onClick={() => router.push("/products")}>
          Browse Products
        </Button>

        <Button variant="contained" onClick={() => router.push("/orders")}>
          View Orders
        </Button> */}

      </Stack>
    </Container>
  );
}
