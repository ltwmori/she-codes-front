import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import MaxWidthWrapper from "@/components/maxWidthWrapper";
import BottomNav from "@/components/bottom-nav";
import "regenerator-runtime/runtime";
import Script from "next/script";
import ReduxProvider from "@/store/provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Script
        strategy="beforeInteractive"
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
      />
      <body
        className={cn(inter.className, "relative h-full font-sans antialiased")}
      >
        <ReduxProvider>
          <main className="relative flex flex-col min-h-screen">
            <MaxWidthWrapper className="shadow-md min-h-screen">
              <div className="">{children}</div>
              <BottomNav />
            </MaxWidthWrapper>
          </main>
          <Toaster />
        </ReduxProvider>
      </body>
    </html>
  );
}