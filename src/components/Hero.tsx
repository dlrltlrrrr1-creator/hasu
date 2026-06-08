import React from "react";
import { Phone, CheckCircle2, Award, Zap, Compass, ShieldAlert, ArrowDown } from "lucide-react";

interface HeroProps {
  onScrollTo: (elementId: string) => void;
}

export default function Hero({ onScrollTo }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/50 to-white pt-8 pb-16 md:py-24">
      {/* Structural visual background curves */}
      <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/50 via-transparent to-transparent -z-10 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Main textual claims */}
          <div className="lg:col-span-7 text-left space-y-6">
            
            {/* Urgency/Area rocket badge */}
            <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-600/20 px-3.5 py-1.5 rounded-full shadow-sm text-blue-700 font-extrabold text-xs sm:text-xs tracking-wider animate-pulse uppercase">
              <Zap className="w-3.5 h-3.5 fill-current animate-bounce text-blue-600" />
              <span>서울·경기 전지역 30분 ~ 1시간 이내 로켓 현장 급파!</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-950 tracking-tight leading-tight sm:leading-none">
              막히고 새고 터진 배관,<br />
              <span className="text-blue-600">명탐정이 한방에</span> 색출해 드립니다!
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-gray-700 font-bold max-w-xl leading-relaxed ring-1 ring-blue-100 bg-white/70 p-4 rounded-xl border-l-[6px] border-blue-600 shadow-sm">
              &quot;하수구 변기 싱크대 막힘 부터 누수 일체, 최신 장비 고압세척까지 한방에 완벽하게 해결해 드리겠습니다.&quot;
              <span className="block mt-2 text-xs font-semibold text-gray-500 text-right">
                - 하수 누수 명탐정 대표 이기식 드림 -
              </span>
            </p>

            {/* Quick check list badges */}
            <div className="grid grid-cols-2 gap-3 max-w-lg mt-4">
              {[
                { title: "정직한 비용 약속", desc: "정직한 양심 시공 약속" },
                { title: "최첨단 국산/독일 장비", desc: "배관 내시경 및 음파 감지" },
                { title: "국내 최단시간 로켓방문", desc: "서울·경기 구역별 기사 상시대계" },
                { title: "철저한 무상 AS 지원", desc: "사후관리까지 명탐정답게" },
              ].map((item, index) => (
                <div key={index} className="flex gap-2.5 items-start p-3 bg-white border border-gray-100 rounded-xl shadow-[0_2px_8px_-3px_rgba(0,0,0,0.06)] hover:border-blue-100 transition-colors">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-extrabold text-gray-950 leading-tight">{item.title}</h4>
                    <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Visual Action-trigger buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <a
                href="tel:010-7777-7745"
                className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-black text-base sm:text-lg px-8 py-4.5 rounded-xl shadow-xl shadow-blue-200 transition-all duration-200 group"
              >
                <Phone className="w-5 h-5 fill-current animate-wiggle" />
                <span>지금 긴급 전화상담 받기</span>
              </a>
              <button
                onClick={() => onScrollTo("estimate")}
                className="flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-extrabold text-base px-6 py-4.5 rounded-xl hover:shadow-lg transition-all duration-200"
              >
                <span>무료 온라인 실시간 견적</span>
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </button>
            </div>

            {/* Quick Info Badges representing business credentials */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-gray-600 font-semibold pt-4">
              <div className="flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-blue-600" />
                <span>사업자등록번호: 173-06-03627</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-blue-600" />
                <span>대표자: 이기식</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-blue-600" />
                <span>출동 구역: 서울·인천·경기 전지역</span>
              </div>
            </div>

          </div>

          {/* Majestic Hero Image Panel */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            <div className="relative mx-auto max-w-[420px] lg:max-w-none">
              
              {/* Outer decorative ring */}
              <div className="absolute -inset-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl opacity-10 blur-xl animate-pulse" />
              
              <div className="relative bg-white p-3 rounded-2xl border border-gray-100 shadow-2xl">
                {/* Hero image showing Korean Plumber in blue */}
                <div className="relative overflow-hidden rounded-xl bg-gray-50 aspect-[4/3] sm:aspect-[16:9] lg:aspect-[4/3]">
                  <img
                    src="/src/assets/images/korean_plumber_hero_1780889859903.png"
                    alt="하수 누수 명탐정 대표 이기식 긴급 출동"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Floating real-time dispatcher bubble */}
                  <div className="absolute bottom-3 left-3 right-3 bg-gray-950/80 backdrop-blur-sm p-3.5 rounded-lg text-white border border-white/10 shadow-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping" />
                        <span className="text-xs sm:text-xs font-bold text-green-400">실시간 매칭 상태</span>
                      </div>
                      <span className="text-[10px] text-gray-300 font-mono">출동율 98.7% 대기 완료</span>
                    </div>
                    <p className="text-xs font-semibold text-gray-100 mt-1.5 tracking-tight leading-snug">
                      현재 서울 강남구 / 경기 하남시 / 성남 한지역 배관 내시경 차 5분전 세팅 완료!
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating badges around the card */}
              <div className="absolute -top-6 -right-4 bg-white border border-blue-100 p-3 rounded-xl shadow-lg flex items-center gap-2.5 animate-bounce [animation-duration:4s]">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-black text-sm">
                  30
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-bold text-blue-600 uppercase leading-none">Rocket Visit</p>
                  <p className="text-xs font-black text-gray-950 mt-0.5">평균 30~50분 내 도착</p>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-4 bg-white border border-gray-100 p-3 rounded-xl shadow-lg flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  🛠️
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-bold text-emerald-600 leading-none">Clean Service</p>
                  <p className="text-xs font-black text-gray-950 mt-0.5">친절 명쾌 성실 시공</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
