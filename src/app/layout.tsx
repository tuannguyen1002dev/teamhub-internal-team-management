import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DialogProvider } from "@/contexts/DialogProvider";
import { AuthProvider } from "@/contexts/AuthProvider";
import BGAnimation from "@/components/basics/bgAnimation";
import { ToastProvider } from "@/contexts/AlertToastContext";
import { FeatureAlertProvider } from "@/contexts/FeaturesAlertProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TeamHub",
  description: "TeamHub - Internal Team Management",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <ToastProvider>
            <FeatureAlertProvider>
              <DialogProvider>
                <BGAnimation />
                {children}
              </DialogProvider>
            </FeatureAlertProvider>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html >
  );
}
