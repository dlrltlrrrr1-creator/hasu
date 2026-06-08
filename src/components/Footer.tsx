import React from "react";
import { Phone, Search, MapPin, Building2, ShieldCheck, Mail } from "lucide-react";

interface FooterProps {
  onOpenAdmin: () => void;
}

export default function Footer({ onOpenAdmin }: FooterProps) {
  return (
    <footer className="bg-gray-950 text-gray-400 py-16 border-t border-white/10 relative overflow-hidden select-none">
      
      {/* Decorative vertical pipeline styling */}
      <div className="absolute left-0 bottom-0 top-0 w-[4px] bg-blue-600/40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Main plumbing brand identity info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                🔍
              </div>
              <h2 className="text-xl font-black text-white tracking-tight">
                하수 누수 <span className="text-blue-500">명탐정</span>
              </h2>
            </div>
            
            <p className="text-xs sm:text-sm text-gray-400 font-medium leading-relaxed max-w-sm">
              &quot;하수구 변기 싱크대 막힘 부터 누수 일체 최신장비 고압세척까지 한방에 완벽하게 해결해지리겠습니다.&quot;
            </p>

            <div className="flex items-center gap-2.5 pt-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping" />
              <span className="text-[11px] text-blue-400 font-extrabold uppercase tracking-widest">
                서울·경기 전지역 최단시간 배치망 운영
              </span>
            </div>
          </div>

          {/* Quick links & services info */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">주요 긴급 출동 지점</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
              <div className="flex items-center gap-1.5 hover:text-white transition-colors">
                <MapPin className="w-3.5 h-3.5 text-blue-500" />
                <span>서울 강남출동지부</span>
              </div>
              <div className="flex items-center gap-1.5 hover:text-white transition-colors">
                <MapPin className="w-3.5 h-3.5 text-blue-500" />
                <span>경기 성남/분당지부</span>
              </div>
              <div className="flex items-center gap-1.5 hover:text-white transition-colors">
                <MapPin className="w-3.5 h-3.5 text-blue-500" />
                <span>서울 양천/목동지부</span>
              </div>
              <div className="flex items-center gap-1.5 hover:text-white transition-colors">
                <MapPin className="w-3.5 h-3.5 text-blue-500" />
                <span>경기 하남/남양주지부</span>
              </div>
              <div className="flex items-center gap-1.5 hover:text-white transition-colors">
                <MapPin className="w-3.5 h-3.5 text-blue-500" />
                <span>서울 노원/강북지부</span>
              </div>
              <div className="flex items-center gap-1.5 hover:text-white transition-colors">
                <MapPin className="w-3.5 h-3.5 text-blue-500" />
                <span>경기 일산/고양지부</span>
              </div>
            </div>
          </div>

          {/* Core telephone calling box */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">24시 접수 직통 전화번호</h4>
            
            <a
              href="tel:010-7777-7745"
              className="flex items-center gap-3 bg-red-650 hover:bg-red-700 hover:scale-103 active:scale-97 text-white p-3.5 rounded-2xl shadow-xl shadow-red-900/40 transition-all duration-250"
            >
              <Phone className="w-5 h-5 fill-current text-white animate-bounce" />
              <div className="text-left">
                <span className="block text-[10px] font-medium opacity-80 leading-none">
                  대기 없이 대표직통 무한 연결
                </span>
                <span className="block text-base sm:text-lg font-black tracking-wider mt-0.5">
                  010-7777-7745
                </span>
              </div>
            </a>

            <div className="text-xs text-gray-500">
              ※ 통화량이 많을 경우 문자 메세지로 현장 주소와 증상을 남겨주시면 대표가 1분 이내 승인 피드백합니다.
            </div>
          </div>

        </div>

        {/* Legal business and registration data declarations */}
        <div className="mt-12 pt-8 border-t border-white/5 text-xs space-y-3">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-500 font-semibold">
            <div className="flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-blue-500" />
              <span>상호: 하수 누수 명탐정</span>
            </div>
            <div>
              <span>대표자: 이기식</span>
            </div>
            <div>
              <span>사업자등록번호: 173-06-03627</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
              <span>개인정보보호책임자: 이기식</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-blue-500" />
              <span>dlrltlrrrr1@gmail.com</span>
            </div>
          </div>

          <p className="text-[10px] text-gray-600 leading-relaxed max-w-5xl">
            본 웹사이트는 하수구 막힘, 누수 탐지, 배관 세척, 수도 보일러 전면 설비 시공 예약 및 정보제공을 목적으로 출동 전문 팀장 매칭 구조로 운영됩니다. 현장 작업은 전문 파트장을 통해 직영 성실 성심 시공을 원칙으로 하며 해결 전 일절 계약 강박 요금 주장을 하지 않습니다.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 text-gray-500">
            <p className="text-[10px] sm:text-xs">
              © 2026 하수 누수 명탐정 (Sewer Leak Detective) All Rights Reserved.
            </p>
            <div className="flex gap-4 text-[10px] items-center">
              <a href="#" className="hover:text-white transition-colors">이용약관</a>
              <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
              <a href="#" className="hover:text-white transition-colors">책임의한계와 법적고지</a>
              <button
                onClick={(e) => { e.preventDefault(); onOpenAdmin(); }}
                className="hover:text-blue-300 text-blue-500 font-extrabold transition-colors cursor-pointer flex items-center gap-0.5"
              >
                🔐 관리자모드
              </button>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
