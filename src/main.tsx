import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import "./index.css";
import {
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import {GoogleOAuthProvider} from "@react-oauth/google";
import {AuthProvider} from "./context/AuthContext.tsx";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
console.log(clientId);

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId={clientId}>
            <AuthProvider>
                <QueryClientProvider client={queryClient}>
                    <RouterProvider router={router} />
                </QueryClientProvider>
            </AuthProvider>
        </GoogleOAuthProvider>
    </React.StrictMode>
);