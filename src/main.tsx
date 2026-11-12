import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ShopProvider } from "./components/context/ShopContext.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ShopProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </ShopProvider>
  </BrowserRouter>,
);
