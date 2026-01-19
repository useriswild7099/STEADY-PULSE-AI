import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { ScrollToTop } from "./components/ScrollToTop";
import { LenisSmoothScroll } from "./components/LenisSmoothScroll";
import "./styles/globals.css";

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <BrowserRouter>
      <LenisSmoothScroll>
        <ScrollToTop />
        <App />
      </LenisSmoothScroll>
    </BrowserRouter>
  </ErrorBoundary>
);
