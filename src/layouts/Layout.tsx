import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
type A = { children: React.ReactNode };

export default function Layout({ children }: A) {
  return (
    <>
      <div className={"bg-white dark:bg-headerBg flex flex-col"}>
        <Header />
        <main>{children}</main>

        <Footer />
      </div>
    </>
  );
}
