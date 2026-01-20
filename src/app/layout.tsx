import type { Metadata } from "next";
import { Open_Sans, Montserrat } from "next/font/google";
import { HeaderProvider } from "@/contexts/HeaderContext";
import { ConditionalLayout } from "@/components/layout/ConditionalLayout";
import { Analytics } from "@/components/admin/Analytics";
import { GHLChatWidget } from "@/components/GHLChatWidget";
import { generateMetadata } from "@/seo/seo-utils";
import { getSiteConfigBranding } from "@/lib/get-site-config";
import "@/styles/globals.css";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  weight: ["700", "800"],
  subsets: ["latin"],
});

// Generate metadata using our SEO utilities
export const metadata: Metadata = {
  ...generateMetadata(),
  icons: {
    icon: [
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "android-chrome-192x192", url: "/favicon/android-chrome-192x192.png" },
      { rel: "android-chrome-512x512", url: "/favicon/android-chrome-512x512.png" },
    ],
  },
  manifest: "/favicon/site.webmanifest",
};

// Export viewport configuration separately (Next.js 13+ pattern)
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const branding = getSiteConfigBranding();
  const colors = branding.colors || {};

  // Generate CSS variables from config colors
  const colorVars = `
    :root {
      ${colors.primary ? `--color-primary: ${colors.primary};` : ''}
      ${colors.primaryLight ? `--color-primary-light: ${colors.primaryLight};` : ''}
      ${colors.primaryDark ? `--color-primary-dark: ${colors.primaryDark};` : ''}
      ${colors.backgroundBlue ? `--color-background-blue: ${colors.backgroundBlue};` : ''}
      ${colors.backgroundBlueLight ? `--color-background-blue-light: ${colors.backgroundBlueLight};` : ''}
      ${colors.backgroundBlueDark ? `--color-background-blue-dark: ${colors.backgroundBlueDark};` : ''}
      ${colors.premium ? `--color-premium: ${colors.premium};` : ''}
      ${colors.premiumLight ? `--color-premium-light: ${colors.premiumLight};` : ''}
      ${colors.premiumDark ? `--color-premium-dark: ${colors.premiumDark};` : ''}
    }
  `;

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon/favicon.ico" sizes="any" />
        {/* Preconnect to GHL domains for faster form and chat widget loading */}
        <link rel="preconnect" href="https://api.leadconnectorhq.com" />
        <link rel="preconnect" href="https://link.msgsndr.com" />
        <link rel="preconnect" href="https://stcdn.leadconnectorhq.com" />
        <link rel="preconnect" href="https://widgets.leadconnectorhq.com" />
        <link rel="dns-prefetch" href="https://www.google.com" />
        {/* Inject theme colors from config */}
        <style id="theme-colors" dangerouslySetInnerHTML={{__html: colorVars}} />
        <style id="nav-font-override" dangerouslySetInnerHTML={{__html: `
          header nav a.font-montserrat,
          header nav a.font-montserrat:link,
          header nav a.font-montserrat:visited,
          header nav a.font-montserrat:hover,
          header nav a.font-montserrat:active {
            font-family: var(--font-montserrat), sans-serif !important;
            font-size: 0.875rem !important;
            font-weight: 700 !important;
            letter-spacing: 0.05em !important;
            text-transform: uppercase !important;
          }

          /* Force override any GHL widget styles */
          body header nav a.font-montserrat,
          body header nav a.font-montserrat * {
            font-family: var(--font-montserrat), sans-serif !important;
            font-size: 0.875rem !important;
            font-weight: 700 !important;
            letter-spacing: 0.05em !important;
            text-transform: uppercase !important;
          }
        `}} />
      </head>
      <body
        className={`${openSans.variable} ${montserrat.variable} antialiased font-sans`}
      >
        <HeaderProvider>
          <Analytics />
          <GHLChatWidget />
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </HeaderProvider>
        <script dangerouslySetInnerHTML={{__html: `
          (function() {
            const style = document.createElement('style');
            style.innerHTML = 'header nav a.font-montserrat { font-family: var(--font-montserrat), sans-serif !important; }';
            document.head.appendChild(style);
          })();
        `}} />
      </body>
    </html>
  );
}
