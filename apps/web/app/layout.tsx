import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Evently | Dashboard",
    description: "A dashboard for evently.",
};

export default function RootLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased font-sans">{children}</body>
        </html>
    );
}
