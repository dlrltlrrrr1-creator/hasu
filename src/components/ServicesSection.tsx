import React, { useState, useEffect } from "react";
import { WORK_SERVICES } from "../data";
import { Camera, Search, HelpCircle, Eye, Hammer, ChevronRight, Sparkles } from "lucide-react";
import { ServiceItem } from "../types";

export default function ServicesSection() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const loadServices = () => {
    const saved = localStorage.getItem("work_services_detective");
    if (saved) {
      try {
        setServices(JSON.parse(saved));
      } catch (e) {
        setServices(WORK_SERVICES);
      }
    } else {
      setServices(WORK_SERVICES);
      localStorage.setItem("work_services_detective", JSON.stringify(WORK_SERVICES));
    }
  };

  useEffect(() => {
    loadServices();

    const handleUpdate = () => {
      loadServices();
    };

    window.addEventListener("detective_data_updated", handleUpdate);
    return () => {
      window.removeEventListener("detective_data_updated", handleUpdate);
    };
  }, []);

  return (
    <section id="services" className="py-16 md:py-24 bg-gray-50 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading Tag */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>최첨단 정밀 작업 현장 일체</span>
          </div>
          <h3 className="text-3xl font-black text-gray-950 tracking-tight sm:text-4xl">
            명탐정 정밀 진단 <span className="text-blue-600">작업 갤러리</span>
          </h3>
          <p className="text-sm sm:text-base text-gray-600 font-medium mt-3 leading-relaxed">
            단순히 뚫는 시늉을 하는 것이 아닌, 첨단 장비를 사용해 막힘의 근본 원인을 투명하게 찾아 드립니다. <br />
            아래의 각 전문 분야 리스트를 누르시면 디테일한 기술 소견과 장비 정보를 볼 수 있습니다.
          </p>
        </div>

        {/* Dynamic Interactive Service Grid list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s) => (
            <div
              key={s.id}
              onClick={() => setSelectedService(s)}
              className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-lg shadow-gray-100/50 hover:shadow-xl hover:-translate-y-1 hover:border-blue-200 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                
                {/* Visual Section representing portfolio cover */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition-colors z-10" />
                  
                  {/* Aspect tag */}
                  <div className="absolute top-4 left-4 bg-blue-600 text-white font-extrabold text-[10px] sm:text-xs px-2.5 py-1 rounded-md z-20 shadow-md">
                    하수·누수 해결 전문
                  </div>

                  <img
                    src={s.imageUrl}
                    alt={s.title}
                    className="w-full h-full object-cover transform scale-102 group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />

                  {/* Glassmorphic hover overview */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 z-20">
                    <span className="bg-white text-gray-900 px-4 py-2 rounded-full font-bold text-xs flex items-center gap-1.5 shadow-md">
                      <Eye className="w-3.5 h-3.5 text-blue-600" /> 세부 작업 소견 보기
                    </span>
                  </div>
                </div>

                {/* Text Description Box */}
                <div className="p-5 sm:p-6 space-y-3">
                  
                  {/* Badges line */}
                  <div className="flex flex-wrap gap-1.5">
                    {s.badges.map((b, i) => (
                      <span key={i} className="text-[9px] sm:text-[10px] font-extrabold bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md border border-blue-50">
                        #{b}
                      </span>
                    ))}
                  </div>

                  <h4 className="text-lg sm:text-xl font-black text-gray-950 group-hover:text-blue-600 transition-colors">
                    {s.title}
                  </h4>
                  
                  <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed line-clamp-2">
                    {s.description}
                  </p>

                </div>

              </div>

              {/* Specs and action bottom list */}
              <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-3 border-t border-gray-50 flex items-center justify-between text-xs font-bold text-gray-700 bg-gray-50/20">
                <span className="text-[11px] text-gray-500 font-medium">당일 즉각 출동 가능 지역</span>
                <span className="text-blue-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  세부공법 <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>

            </div>
          ))}
        </div>

        {/* Detailed Modal popup on click */}
        {selectedService && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full border border-gray-100 shadow-2xl animate-scale-up">
              
              <div className="relative aspect-video bg-gray-100">
                <img
                  src={selectedService.imageUrl}
                  alt={selectedService.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <button
                  onClick={() => setSelectedService(null)}
                  className="absolute top-4 right-4 bg-gray-950/80 hover:bg-black text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 sm:p-8 space-y-5">
                
                <div className="flex flex-wrap gap-2">
                  {selectedService.badges.map((b, i) => (
                    <span key={i} className="text-xs font-extrabold bg-blue-50 text-blue-600 px-3 py-1 rounded-md border border-blue-100">
                      #{b}
                    </span>
                  ))}
                </div>

                <div>
                  <h4 className="text-2xl font-black text-gray-950">{selectedService.title} 정밀 기법</h4>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed mt-2.5">
                    {selectedService.description}
                  </p>
                </div>

                <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100/50 space-y-3">
                  <h5 className="text-xs sm:text-sm font-black text-blue-900 flex items-center gap-1.5">
                    <Hammer className="w-4 h-4 text-blue-600" />
                    <span>명탐정 권장 공법 및 투입 최첨단 장비</span>
                  </h5>
                  <ul className="space-y-2 text-xs sm:text-sm text-gray-700 font-medium">
                    {selectedService.specs.map((spec, i) => (
                      <li key={i} className="flex gap-2 items-start">
                        <span className="text-blue-600 shrink-0 select-none">✔</span>
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-3 pt-2">
                  <a
                    href="tel:010-7777-7745"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-center py-3 rounded-xl shadow-lg shadow-blue-100 text-xs sm:text-sm flex items-center justify-center gap-1.5"
                  >
                    🚀 즉시 출동 전화 신청
                  </a>
                  <button
                    onClick={() => setSelectedService(null)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 rounded-xl text-xs sm:text-sm transition-colors"
                  >
                    창 닫기
                  </button>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
