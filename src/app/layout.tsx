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
        <NavBar />
        <main className="px-8 py-3">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
