import React from "react";
import { INSTALLATION_SERVICES } from "../data";
import { Hammer, ShieldCheck, Timer, Settings2, Sparkles } from "lucide-react";

const ADVANCED_EQUIPMENT = [
  {
    name: "독일제 초고밀도 청음식 누수탐지기",
    desc: "미세한 누수음도 정확하게 포착하여 불필요한 벽지나 바닥 파쇄를 완전히 예방해 줍니다.",
    icon: "🔊"
  },
  {
    name: "미국 리지드(RIDGID) 배관 내시경 카메라",
    desc: "어두운 하수구 깊숙한 곳까지 초고화질로 촬영해 막힘의 원인(유지방, 유기물)을 실시간 눈으로 확인시킵니다.",
    icon: "🎥"
  },
  {
    name: "250바(bar) 전용 엔진식 초고압 세척기",
    desc: "배관 벽면에 붙은 기름 찌꺼기와 결석 구조물을 완전 분쇄해 새 배관 같은 컨디션으로 복원합니다.",
    icon: "⚡"
  },
  {
    name: "관로탐지 송신기 (Sonde Locator)",
    desc: "콘크리트 속에 숨겨진 배관의 정확한 주행 경로를 평면 도면처럼 정확히 스캔해 냅니다.",
    icon: "📡"
  }
];

export default function PlumbingEquipment() {
  return (
    <section id="installations" className="py-16 md:py-24 bg-white scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading Tag */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full mb-3">
            <Settings2 className="w-3.5 h-3.5" />
            <span>프리미엄 설비 및 부분 전면 교체 시공</span>
          </div>
          <h3 className="text-3xl font-black text-gray-950 tracking-tight sm:text-4xl">
            명탐정 프리미엄 <span className="text-blue-600">설비 교체 서비스</span>
          </h3>
          <p className="text-sm sm:text-base text-gray-600 font-medium mt-3 leading-relaxed">
            막힌 곳을 뚫어내는 기술은 물론, 최고의 부품과 정성어린 마감으로 <br />
            고객님의 욕실, 주방, 베란다의 모든 노후 주방 설비 및 도기를 당일 완벽 교체 시공합니다.
          </p>
        </div>

        {/* Dynamic Service Grid representation for Installations ("설비") */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {INSTALLATION_SERVICES.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-7 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:border-blue-200 hover:shadow-xl transition-all duration-300 relative overflow-hidden group flex flex-col justify-between"
            >
              
              {/* Inner Decorative watermark element */}
              <div className="absolute top-0 right-0 w-20 h-20 -mr-5 -mt-5 bg-blue-50/50 rounded-full group-hover:scale-125 transition-transform duration-500 -z-0" />

              <div className="z-10">
                {/* Header detail with title */}
                <div className="flex items-center justify-between pb-4 border-b border-gray-50">
                  <span className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg">
                    🔧
                  </span>
                  <div className="flex gap-1">
                    {item.badges.slice(0, 2).map((b, i) => (
                      <span key={i} className="text-[9px] font-black text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                        {b}
                      </span>
                    ))}
                  </div>
                </div>

                <h4 className="text-lg sm:text-xl font-black text-gray-950 mt-4">
                  {item.title}
                </h4>

                <p className="text-xs sm:text-xs text-gray-650 font-medium mt-2 leading-relaxed">
                  {item.description}
                </p>

                {/* Technical installation specifications */}
                <div className="mt-4 space-y-1.5 bg-gray-50 p-3.5 rounded-xl text-[11px] sm:text-xs text-gray-600 font-medium">
                  {item.specs.map((spec, i) => (
                    <div key={i} className="flex gap-1.5 items-start">
                      <span className="text-blue-600 shrink-0 select-none">▪</span>
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Install terms */}
              <div className="mt-5 pt-4 border-t border-gray-50 flex items-center justify-between text-[11px] font-bold text-gray-500 z-10">
                <div className="flex items-center gap-1">
                  <Timer className="w-3.5 h-3.5 text-blue-600" />
                  <span>당일 1~2시간 이내 완공</span>
                </div>
                <div className="flex items-center gap-1 text-emerald-600 font-extrabold bg-emerald-50 px-2 py-0.5 rounded-md">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>100% 사후 무상 AS 보장</span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Highlight Section: The Advanced Detective Tools (명탐정 장비실) */}
        <div id="equipment" className="mt-16 md:mt-24 bg-gradient-to-br from-gray-900 to-blue-950 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          
          {/* background circular mesh layer */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -ml-16 -mb-16" />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Visual labels */}
            <div className="lg:col-span-5 space-y-5 text-left">
              <span className="text-xs font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
                🔍 하수 누수 명탐정만의 독보적 경쟁력
              </span>
              <h4 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                정밀 진단 우선!<br />
                <span className="text-blue-400">정확한 장비 진단</span>으로 해결합니다!
              </h4>
              <p className="text-xs sm:text-sm text-gray-300 font-medium leading-relaxed">
                하수 누수 명탐정은 동네 주먹구구식 철사 통수가 아닌, 수백만 원 상당의 독일/미국 최첨단 배관 전문 카메라와 정밀 누수 가스 분석 탐지기를 현장에 동원합니다. 과학적인 원인 판독으로 배관 손상 없이 신속 정확하게 해결해 드립니다.
              </p>
              
              <div className="pt-2">
                <a
                  href="tel:010-7777-7745"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 hover:scale-103 active:scale-97 text-white font-black text-xs sm:text-sm px-6 py-3 rounded-xl transition-all shadow-lg"
                >
                  <span>긴급 진단 구급차 호출 (010-7777-7745)</span>
                </a>
              </div>
            </div>

            {/* Grid display of Advanced technical equipment tools */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 text-left">
              {ADVANCED_EQUIPMENT.map((eq, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{eq.icon}</span>
                    <h5 className="text-sm font-extrabold text-blue-300">{eq.name}</h5>
                  </div>
                  <p className="text-xs text-gray-300 font-medium leading-relaxed mt-2.5">
                    {eq.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
