import Navbar from "@/component/navbar";
import "./globals.css";
import Footer from "@/component/footer";
import ScrollButton from "@/component/scrollButton";

export const metadata = {
  title: "My Mini Ecommerce",
  description: "Simple eCommerce app with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
        <ScrollButton />
      </body>
    </html>
  );
}
