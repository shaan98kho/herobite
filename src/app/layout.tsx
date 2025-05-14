import NavBar from "@/components/Navbar"
import Link from "next/link"
import "./globals.css"
import Footer from "@/components/Footer"
import ReactQueryProvider from "@/components/ReactQueryProvider"


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col min-h-screen w-full">
          <ReactQueryProvider>
            <header className="sticky top-0 z-1">
              <NavBar />
            </header>
            <main className="pb-20">
              {children}
            </main>
            <Footer />
          </ReactQueryProvider>
        </div>
      </body>
    </html>
  );
}
