import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ShopProvider } from "./components/context/ShopContext.tsx";
(function () {
  const redirect = sessionStorage.redirect;
  delete sessionStorage.redirect;
  if (redirect && redirect !== location.href) {
    history.replaceState(null, "", redirect);
  }
})();
createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename="/shop">
    <ShopProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </ShopProvider>
  </BrowserRouter>,
);
