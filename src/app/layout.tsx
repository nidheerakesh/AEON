import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import Sidebar from "@/components/layout/Sidebar";

export const metadata: Metadata = {
  title: "AEON — AI-Powered Learning Engine",
  description: "Master Backend Development, Machine Learning, and DSA in 12 weeks with AI-guided daily plans, gamification, and ADHD-friendly design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <div className="app-layout">
            <Sidebar />
            <main className="main-content">
              {children}
            </main>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
