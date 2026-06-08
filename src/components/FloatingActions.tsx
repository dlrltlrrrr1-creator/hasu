import React from "react";
import { Phone, MessageCircle, ArrowUp } from "lucide-react";

export default function FloatingActions() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 items-end select-none">
      
      {/* 1. KakaoTalk Sticky Floating Button */}
      <a
        href="https://open.kakao.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-[#FEE500] hover:bg-[#FDD000] text-[#371D1D] font-black text-sm px-4 py-3 rounded-full shadow-lg shadow-yellow-100 hover:scale-105 active:scale-95 transition-all duration-200 group"
        title="카카오톡 1:1 실시간 문의"
      >
        {/* Customized Kakao Speech Bubble Accent icon */}
        <MessageCircle className="w-5 h-5 fill-[#371D1D] text-[#371D1D] group-hover:animate-bounce" />
        <span className="hidden sm:inline">카톡 실시간문의</span>
      </a>

      {/* 2. Direct Emergency Telephone Calling Button */}
      <a
        href="tel:010-7777-7745"
        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-black text-sm px-4 py-3.5 rounded-full shadow-lg shadow-red-200 hover:scale-105 active:scale-95 transition-all duration-200 group animate-pulse"
        title="24시 대표 직통 즉시 통화"
      >
        <Phone className="w-5 h-5 fill-current text-white group-hover:animate-wiggle" />
        <span className="hidden sm:inline">24시 긴급전화</span>
        <span className="sm:hidden font-mono">전화걸기</span>
      </a>

      {/* 3. Small Scroll-to-Top Button */}
      <button
        onClick={scrollToTop}
        className="w-10 h-10 rounded-full bg-gray-900 border border-gray-800 text-white flex items-center justify-center shadow-md hover:bg-gray-800 active:scale-90 transition-all duration-200"
        title="위로 올라가기"
      >
        <ArrowUp className="w-4 h-4" />
      </button>

    </div>
  );
}
