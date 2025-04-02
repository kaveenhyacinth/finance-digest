import "@/styles/globals.css";
import "@/styles/overrides.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans, notoSerif, roboto, robotoMono } from "@/config/fonts";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico"
  }
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" }
  ]
};

export default function RootLayout({
                                     children
                                   }: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
    <head />
    <body
      className={clsx(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable,
        notoSerif.variable,
        roboto.variable,
        robotoMono.variable
      )}
    >
    <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
      <div className="relative flex flex-col h-screen">
        <main className="container mx-auto max-w-7xl pt-11 px-6 flex-grow">
          {children}
        </main>
        <footer className="w-full flex items-center justify-center py-3" />
      </div>
    </Providers>
    </body>
    </html>
  );
}
