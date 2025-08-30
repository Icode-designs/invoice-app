import StyledComponentsRegistry from "@/lib/registry";
import type { Metadata } from "next";
import ThemeContextProvider from "@/providers/themeProvider";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Invoice App | by Bonaventure",
  description: "An invoice app built with Next.js and TypeScript",
  keywords: ["invoice", "app", "nextjs", "typescript", "styled-components"],
  authors: [{ name: "Bonaventure", url: "https://bonaventure-dev.vercel.app" }],
  creator: "Bonaventure",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <StyledComponentsRegistry>
          <ThemeContextProvider>
            <Header />

            {children}
          </ThemeContextProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
