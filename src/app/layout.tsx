import NavBar from "@/components/navbar"
import "./globals.css"
import Footer from "@/components/footer"
import ReactQueryProvider from "@/components/reactQueryProvider"


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
            <NavBar />
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
