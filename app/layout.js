import { Work_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "./navbar/page";
import Footer from "./footer/page";
import { ModalProvider } from "./(components)/ModalProvider/ModalProvider";
import { CartProvider } from "./context/cartContext";
import { AuthProvider } from "./context/authContext";
import { Toaster } from "sonner";

const workSans = Work_Sans({
  variable: "--workSans",
  subsets: ["latin"],
});

const Playfair = Playfair_Display({
  variable: "--playfairDisplay",
  subsets: ["latin"],
});

export const metadata = {
  title: "Edval Art AUction",
  description: "Discover, Bid, & Collect Art from Around the World. A curated destination for live art auctions, exhibitions, fine art sales, and artist discovery.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${workSans.variable} ${Playfair.variable}`}>
      <body>
        <AuthProvider>
          <ModalProvider>
            <CartProvider>
              <Navbar />
              {children}
              <Toaster position="top-right" richColors closeButton expand={false} duration={3000} />
              <Footer />
            </CartProvider>
          </ModalProvider>
        </AuthProvider>
      </body>
      
    </html>
  );
}
