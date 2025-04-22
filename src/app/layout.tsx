import NavBar from "@/components/navbar"
import "./globals.css"
import Footer from "@/components/footer"
import ClientComponent from "@/components/clientComponent"


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col min-h-screen w-full">
          <ClientComponent>
            <NavBar />
            <main className="px-8 py-3">
              {children}
            </main>
            <Footer />
          </ClientComponent>
        </div>
      </body>
    </html>
  );
}
