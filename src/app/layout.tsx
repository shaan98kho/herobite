import NavBar from "@/components/navbar";
import "./globals.css";
import Footer from "@/components/footer";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col min-h-screen w-full">
          <NavBar />
          <main className="px-8 py-3">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
