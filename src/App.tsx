import React, { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import SewerRequestForm from "./components/SewerRequestForm";
import ServicesSection from "./components/ServicesSection";
import PlumbingEquipment from "./components/PlumbingEquipment";
import ReviewsQnA from "./components/ReviewsQnA";
import Footer from "./components/Footer";
import FloatingActions from "./components/FloatingActions";
import AdminModal from "./components/AdminModal";

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const handleScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      const headerOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="font-sans min-h-screen flex flex-col bg-white text-gray-900 antialiased selection:bg-blue-600 selection:text-white">
      
      {/* Dynamic Header section */}
      <Header onScrollTo={handleScrollTo} onOpenAdmin={() => setIsAdminOpen(true)} />

      <main className="flex-grow">
        
        {/* Dynamic Hero banner */}
        <Hero onScrollTo={handleScrollTo} />

        {/* Live pricing estimation & rocket dispatch form */}
        <SewerRequestForm />

        {/* Clogs/Leaks dynamic portfolio listing */}
        <ServicesSection />

        {/* Facilities repair list & advanced machinery specs */}
        <PlumbingEquipment />

        {/* Reviews, technical consulting Q&A, and FAQs */}
        <ReviewsQnA />

      </main>

      {/* Trustable direct footer */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Scroll-followed Quick Action Widgets */}
      <FloatingActions onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* 스마트 관리자 포털 모달 */}
      <AdminModal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />

    </div>
  );
}
