import React, { useState, useEffect } from "react";
import { Phone, Search, Zap, CheckCircle2, ShieldCheck, MapPin } from "lucide-react";

interface HeaderProps {
  onScrollTo: (elementId: string) => void;
  onOpenAdmin: () => void;
}

export default function Header({ onScrollTo, onOpenAdmin }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("services");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top flashing notification bar */}
      <div className="bg-blue-600 text-white text-xs sm:text-sm py-2 px-4 font-semibold text-center flex items-center justify-center gap-2 overflow-hidden select-none">
        <Zap className="w-4 h-4 text-amber-300 animate-bounce" />
        <span className="tracking-wide">
          [긴급출동] 서울·인천·경기 전지역 30분~1시간 로켓 현장 급파! 양심 시공 약속!
        </span>
        <span className="hidden md:inline-flex items-center gap-1 ml-4 bg-blue-800 text-[10px] px-2 py-0.5 rounded-full font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> 24시 접수처 대기중
        </span>
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-md py-3"
            : "bg-white py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo Brand Area */}
          <div className="flex items-center gap-3">
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center gap-2 group select-none"
            >
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600 text-white shadow-md shadow-blue-200 group-hover:bg-blue-700 transition-colors">
                <Search className="w-5 h-5 absolute -translate-x-0.5 -translate-y-0.5" />
                <span className="text-[10px] font-bold absolute bottom-1 right-1 text-white leading-none">명탐정</span>
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-black text-gray-950 tracking-tight leading-none">
                  하수 누수 <span className="text-blue-600">명탐정</span>
                </h1>
                <p className="text-[10px] sm:text-xs font-semibold text-blue-600 tracking-wide mt-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-red-500 fill-red-500" /> 서울·경기 공식지정출동처
                </p>
              </div>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {[
              { id: "services", label: "주요 작업" },
              { id: "installations", label: "교체/설비 시공" },
              { id: "estimate", label: "실시간 한방 견적" },
              { id: "equipment", label: "명탐정 장비실" },
              { id: "reviews", label: "실제 통수 후기" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  onScrollTo(tab.id);
                }}
                className={`px-4 py-2 text-sm font-bold rounded-lg transition-all duration-200 ${
                  activeTab === tab.id
                    ? "text-blue-600 bg-blue-50/80"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Direct Call & Quick Contact Badge */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Subtle Admin Trigger Key */}
            <button
              onClick={onOpenAdmin}
              className="p-2 border border-blue-100 hover:border-blue-200 bg-blue-50/50 hover:bg-blue-50 text-blue-600 rounded-full transition-colors cursor-pointer flex items-center justify-center"
              title="관리자 스마트 모드"
            >
              <ShieldCheck className="w-5 h-5" />
            </button>

            <a
              href="tel:010-7777-7745"
              id="cta_header_phone"
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 hover:scale-105 active:scale-95 text-white font-extrabold text-xs sm:text-sm md:text-base px-3 py-2 sm:px-4 sm:py-2.5 rounded-full shadow-lg shadow-red-200 transition-all duration-200 group animate-pulse"
            >
              <Phone className="w-4 h-4 sm:w-5 h-5 fill-current animate-bounce" />
              <div className="text-left">
                <span className="block text-[9px] sm:text-[10px] opacity-90 font-medium leading-none">
                  [즉시연결] 대표 이기식 사장
                </span>
                <span className="block tracking-wider font-black">
                  010-7777-7745
                </span>
              </div>
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
