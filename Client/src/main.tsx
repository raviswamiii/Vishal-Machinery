import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "./context/userContext.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <UserContextProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </UserContextProvider>
  </BrowserRouter>,
);
