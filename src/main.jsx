import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <GoogleOAuthProvider clientId="805525166736-fp28sj22hhnl2rp8829s7u4krs0v6g8o.apps.googleusercontent.com">
            <App />
        </GoogleOAuthProvider>
    </StrictMode>,
);
