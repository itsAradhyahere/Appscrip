import "@/styles/globals.css";
import ErrorBoundary from "@/components/ErrorBoundary";

// keep your providers here if you have them:
import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/context/ToastContext";

export default function App({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <CartProvider>
        <ToastProvider>
          <Component {...pageProps} />
        </ToastProvider>
      </CartProvider>
    </ErrorBoundary>
  );
}
