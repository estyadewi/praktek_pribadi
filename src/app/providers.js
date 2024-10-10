"use client";
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "react-hot-toast";

export function Providers({ children }) {
  return (
    <NextUIProvider>
      {children}
      <Toaster
        toastOptions={{
          style: {
            backgroundColor: "rgba(8, 145, 178, 0.5)",
            color: "#fff",
            backdropFilter: "blur(2px)",
            WebkitBackdropFilter: "blur(8px)",
          },
          error: {
            style: {
              backgroundColor: "rgba(255, 0, 0, 0.5)",
              color: "#fff",
              backdropFilter: "blur(2px)",
              WebkitBackdropFilter: "blur(8px)",
            },
          },
          success: {
            style: {
              backgroundColor: "rgba(76, 175, 80, 0.6)",
              color: "#fff",
              backdropFilter: "blur(2px)",
              WebkitBackdropFilter: "blur(8px)",
            },
          },
        }}
      />
    </NextUIProvider>
  );
}
