import React from "react";

export default function WelcomePageLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`antialiased`}>
        {children}
      </body>
    </html>
  );
}