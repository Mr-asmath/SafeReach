import { Suspense } from "react";
import AppAutoRefresh from "@/components/AppAutoRefresh";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={null}>
        <AppAutoRefresh />
      </Suspense>
      {children}
    </>
  );
}
