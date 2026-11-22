import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { PageSkeleton } from "./components/Skeleton";
import { BackToTop, FloatingWhatsApp, Intro, ScrollProgress, ScrollToTop } from "./components/Extras";

const Home = lazy(() => import("./pages/Home/Home"));
const DressDetail = lazy(() => import("./pages/DressDetail/DressDetail"));
const TailorOrder = lazy(() => import("./pages/TailorOrder/TailorOrder"));
const CustomizeGallery = lazy(() => import("./pages/CustomizeGallery/CustomizeGallery"));
const DesignDetail = lazy(() => import("./pages/DesignDetail/DesignDetail"));
const Wishlist = lazy(() => import("./pages/Wishlist/Wishlist"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));

const Page = ({ children }) => (
  <motion.main initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>{children}</motion.main>
);

export default function App() {
  const location = useLocation();
  return (
    <>
      <Intro /><ScrollProgress /><ScrollToTop />
      <Navbar />
      <Suspense fallback={<PageSkeleton />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Page><Home /></Page>} />
            <Route path="/dress/:id" element={<Page><DressDetail /></Page>} />
            <Route path="/tailor-order" element={<Page><TailorOrder /></Page>} />
            <Route path="/customize" element={<Page><CustomizeGallery /></Page>} />
            <Route path="/customize/:id" element={<Page><DesignDetail /></Page>} />
            <Route path="/wishlist" element={<Page><Wishlist /></Page>} />
            <Route path="*" element={<Page><NotFound /></Page>} />
          </Routes>
        </AnimatePresence>
      </Suspense>
      <Footer /><FloatingWhatsApp /><BackToTop />
    </>
  );
}
