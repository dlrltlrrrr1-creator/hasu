import React, { useState, useEffect } from "react";
import { EstimateRequest } from "../types";
import { ClipboardList, Calculator, HelpCircle, PhoneCall, Trash2, Check, Clock, User, Compass, ServerCrash } from "lucide-react";

const REGIONS = {
  "서울 전지역": [
    "강남구", "강서구", "송파구", "서초구", "노원구", 
    "서대문구", "마포구", "용산구", "동대문구", "영등포구", 
    "구로구", "동작구", "성동구", "광진구", "중랑구"
  ],
  "경기 전지역": [
    "성남시 분당구", "수원시 팔달구", "용인시 기흥구", "고양시 일산동구", 
    "부천시", "남양주시", "안양시 동안구", "하남시", "김포시", "파주시",
    "의정부시", "화성시 동탄", "시흥시", "광주시", "안산시"
  ]
};

const SERVICE_PRICING: Record<string, { basePrice: number; text: string }> = {
  "하수구막힘": { basePrice: 50000, text: "하수구 막힘 강력 통수" },
  "배관수리": { basePrice: 150000, text: "노후 및 누수 배관 전문 수리" },
  "배관고압세척": { basePrice: 300000, text: "고압 세척 스케일링" },
  "배관관로탐지": { basePrice: 100000, text: "매립 하수구/수도관 위치 추적" },
  "누수탐지및수리": { basePrice: 200000, text: "정밀 가스식/청음식 누수 탐지" },
  "펌프수리교체": { basePrice: 180000, text: "가압/지하집수조 펌프 모터 정품 교체" },
  "변기교체": { basePrice: 150000, text: "친환경 신형 도기 양변기 전면 교체" },
  "변기부속교체": { basePrice: 40000, text: "KS 표준 무소음 부속 세트 교양" },
  "싱크대부속교체": { basePrice: 50000, text: "싱크배수구 홈통 및 위생 S트랩 교체" },
  "수전교체": { basePrice: 60000, text: "주방 스프레이/샤워 거위목 국산 수도꼭지 교체" },
  "수도배관교체": { basePrice: 400000, text: "친환경 PB 에이콘 노후 수도관 전면 시공" },
  "보일러교체": { basePrice: 600000, text: "1등급 친환경 가스 콘덴싱 콘트롤러 포함 교체" }
};

export default function SewerRequestForm() {
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("서울 전지역");
  const [selectedSubRegion, setSelectedSubRegion] = useState("강남구");
  const [selectedService, setSelectedService] = useState("하수구막힘");
  const [customDescription, setCustomDescription] = useState("");
  
  const [history, setHistory] = useState<EstimateRequest[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [calculatedPrice, setCalculatedPrice] = useState(50000);
  const [showProgress, setShowProgress] = useState<string | null>(null);

  // Load history from localStorage and listen to updates
  const loadHistoryData = () => {
    const saved = localStorage.getItem("estimations_detective");
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    } else {
      setHistory([]);
    }
  };

  useEffect(() => {
    loadHistoryData();

    const handleUpdate = () => {
      loadHistoryData();
    };

    window.addEventListener("detective_data_updated", handleUpdate);
    return () => {
      window.removeEventListener("detective_data_updated", handleUpdate);
    };
  }, []);

  // Sync pricing automatically
  useEffect(() => {
    if (SERVICE_PRICING[selectedService]) {
      setCalculatedPrice(SERVICE_PRICING[selectedService].basePrice);
    }
  }, [selectedService]);

  // Handle region shift change sub-regions
  const handleRegionChange = (reg: string) => {
    setSelectedRegion(reg);
    setSelectedSubRegion(REGIONS[reg as keyof typeof REGIONS][0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim()) {
      alert("성함과 전화번호를 정확히 기재해 주세요!");
      return;
    }

    const newRequest: EstimateRequest = {
      id: `request-${Date.now()}`,
      customerName: customerName.trim(),
      phone: phone.trim(),
      region: selectedRegion,
      subRegion: selectedSubRegion,
      serviceType: selectedService,
      customDescription: customDescription || "추가 특이사항 없음",
      createdAt: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      status: "pending"
    };

    const updated = [newRequest, ...history];
    setHistory(updated);
    localStorage.setItem("estimations_detective", JSON.stringify(updated));

    setIsSubmitted(true);
    setShowProgress(newRequest.id);
    
    // Clear fields
    setCustomerName("");
    setPhone("");
    setCustomDescription("");

    // Reset indicator animation after a timeout
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  const handleDeleteHistory = (id: string) => {
    const filtered = history.filter(item => item.id !== id);
    setHistory(filtered);
    localStorage.setItem("estimations_detective", JSON.stringify(filtered));
    if (showProgress === id) setShowProgress(null);
  };

  return (
    <section id="estimate" className="py-16 md:py-24 bg-white border-y border-gray-100 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Aesthetic Centered Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>투명하고 신뢰도 높은 명탐정 견적서</span>
          </div>
          <h3 className="text-3xl font-black text-gray-950 tracking-tight sm:text-4xl">
            가견적 확인 및 실시간 <span className="text-blue-600">30분 출동 접수</span>
          </h3>
          <p className="text-sm sm:text-base text-gray-600 font-medium mt-3">
            필요한 서비스를 선택하시면 즉시 투명한 기본 요금을 확인할 수 있으며, <br />
            &quot;명탐정 긴급 해결팀&quot;이 접수 즉시 확인 후 해피콜 및 로켓 배정을 드립니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main interactive quote calculator form */}
          <div className="lg:col-span-7 bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-xl shadow-gray-100 relative">
            <div className="absolute top-0 right-8 -translate-y-1/2 bg-blue-600 text-white font-black text-xs px-4 py-1.5 rounded-full shadow-md">
              신속 정확 정직한 약속!
            </div>

            <h4 className="text-lg sm:text-xl font-extrabold text-gray-950 flex items-center gap-2 mb-6">
              <ClipboardList className="w-5 h-5 text-blue-600" />
              <span>간편 상담 &amp; 30분 긴급 출동 신청서</span>
            </h4>

            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Customer name */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    고객 성함 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="홍길동"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-lg text-sm text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:bg-white focus:border-blue-600 transition-colors"
                    />
                  </div>
                </div>

                {/* Customer phone */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    긴급 연락처 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <PhoneCall className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="010-7777-7745"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-lg text-sm text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:bg-white focus:border-blue-600 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Service region map selections */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    방문 지역 선택 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Compass className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <select
                      value={selectedRegion}
                      onChange={(e) => handleRegionChange(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-lg text-sm text-gray-950 font-bold focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:bg-white focus:border-blue-600"
                    >
                      <option value="서울 전지역">서울 전지역 (30분대 방문)</option>
                      <option value="경기 전지역">경기/인천 전지역 (1시간이내 방문)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    세부 행정구/도시 선택 <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={selectedSubRegion}
                    onChange={(e) => setSelectedSubRegion(e.target.value)}
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-lg text-sm text-gray-950 font-bold focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:bg-white"
                  >
                    {REGIONS[selectedRegion as keyof typeof REGIONS].map((sub, i) => (
                      <option key={i} value={sub}>{sub}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Core selection of Services */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  필요한 전문 기술/공사 종류 <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {Object.keys(SERVICE_PRICING).map((key) => {
                    const active = selectedService === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setSelectedService(key)}
                        className={`py-2 px-3 border text-left rounded-lg text-[11px] sm:text-xs font-bold transition-all duration-200 ${
                          active
                            ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-100"
                            : "bg-white text-gray-700 border-gray-100 hover:border-blue-200 hover:bg-gray-50/50"
                        }`}
                      >
                        <span className="block truncate">{SERVICE_PRICING[key].text}</span>
                        <span className={`block font-mono text-[9px] mt-0.5 ${active ? "text-blue-100" : "text-blue-600"}`}>
                          정찰 기본가: {SERVICE_PRICING[key].basePrice.toLocaleString()}원~
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Additional comments/symptom description */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  현재 증상 및 건물 종류 (상세히 작성해주시면 기사 배정이 더 빠릅니다)
                </label>
                <textarea
                  placeholder="예: 아파트 3층이고 화장실 물을 내리면 바닥 하수구로 역류하며 뽀글뽀글 거립니다. / 상가 건물 화장실 막힘 등"
                  rows={2}
                  value={customDescription}
                  onChange={(e) => setCustomDescription(e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-100 rounded-lg text-xs sm:text-sm text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:bg-white focus:border-blue-600 transition-colors"
                />
              </div>

              {/* Live Price Estimation Warning Gauge */}
              <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                <div className="flex justify-between items-center">
                  <div className="text-left">
                    <span className="text-[10px] bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded-full">실시간 가견적</span>
                    <p className="text-xs text-gray-500 font-medium mt-1">배관 내시경 확인 전 가산출 기본 단가</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-400 font-medium line-through mr-1.5">
                      {(calculatedPrice * 1.25).toLocaleString()}원
                    </span>
                    <span className="text-lg sm:text-2xl font-black text-blue-600 font-mono">
                      {calculatedPrice.toLocaleString()}원~
                    </span>
                  </div>
                </div>
                <p className="text-[10px] text-gray-500 font-medium mt-2 leading-relaxed">
                  ※ 현장 상태(배관 길이, 막힘 원인체 유형, 도기 사양)에 따라 요금이 조정될 수 있습니다. <strong className="text-gray-700">작업 전 정확한 현장 소견을 밝히고 합의 후 진행하므로 미동의 비용 요출은 전혀 없습니다!</strong>
                </p>
              </div>

              {/* Action output for submit */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-extrabold text-sm sm:text-base py-3 sm:py-4 rounded-xl shadow-lg shadow-blue-200 transition-all duration-200"
              >
                무료 명탐정 30분 로켓 출동 신청하기
              </button>
            </form>

            {/* Quick success toast built directly into panel */}
            {isSubmitted && (
              <div className="absolute inset-x-6 bottom-4 bg-emerald-600 text-white p-3.5 rounded-xl shadow-lg flex items-center gap-3 animate-fade-in">
                <span className="bg-white/20 p-1.5 rounded-full">
                  <Check className="w-4 h-4 text-white" />
                </span>
                <span className="text-xs sm:text-sm font-bold text-left">
                  접수가 완료되었습니다! 담당 출동 기사가 5분 내 배정 전화를 발송합니다!
                </span>
              </div>
            )}
          </div>

          {/* Real-time browser local database request tracker */}
          <div className="lg:col-span-5 h-full space-y-5">
            <div className="bg-gray-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col justify-between h-full min-h-[480px]">
              
              {/* background trace water pipelines graphic effect */}
              <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-10 bg-[radial-gradient(#1e40af_1px,transparent_1px)] [background-size:16px_16px]" />
              
              <div>
                <h4 className="text-base sm:text-lg font-black tracking-tight flex items-center justify-between pb-4 border-b border-white/10">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
                    나의 실시간 출동/상담 요청 정보
                  </span>
                  <span className="text-xs font-mono text-gray-400">총 {history.length}건</span>
                </h4>

                <p className="text-[11px] text-gray-400 mt-3 leading-relaxed">
                  고객님의 브라우저(Local)에 직접 보관된 1:1 상담 예약 상태입니다. 접수한 시각에 따라 진행 상황을 모니터링할 수 있습니다.
                </p>

                {history.length === 0 ? (
                  <div className="py-16 text-center text-gray-500 space-y-3">
                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto text-lg text-gray-300">
                      📝
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-300">접수 기록이 존재하지 않습니다</p>
                      <p className="text-[10px] text-gray-500 mt-1">왼쪽 신청서를 작성해 출동을 요청하세요!</p>
                    </div>
                  </div>
                ) : (
                  <div className="mt-5 space-y-4 max-h-[340px] overflow-y-auto pr-1">
                    {history.map((req, idx) => {
                      const isCurrentProgress = showProgress === req.id || idx === 0;
                      return (
                        <div key={req.id} className="bg-white/5 rounded-xl p-4 border border-white/10 relative">
                          <div className="flex items-center justify-between gap-2">
                            <div>
                              <span className="text-[10.5px] font-extrabold text-blue-400">
                                {req.region} {req.subRegion}
                              </span>
                              <h5 className="text-xs font-bold text-white mt-0.5">
                                {SERVICE_PRICING[req.serviceType]?.text || req.serviceType}
                              </h5>
                            </div>
                            <button
                              onClick={() => handleDeleteHistory(req.id)}
                              className="text-gray-500 hover:text-red-400 p-1 rounded-md transition-colors"
                              title="삭제"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="flex items-center gap-x-3 gap-y-1 flex-wrap text-[10px] text-gray-400 mt-2 font-mono">
                            <span>고객명: {req.customerName.charAt(0)}*동</span>
                            <span>신청시각: {req.createdAt}</span>
                          </div>

                          {/* Interactive dispatch dynamic track status bar */}
                          <div className="mt-3 pt-2.5 border-t border-white/5">
                            <div className="flex justify-between items-center text-[9px] font-bold text-gray-400 mb-1">
                              <span className="text-blue-400 flex items-center gap-0.5">
                                <Clock className="w-2.5 h-2.5" /> 접수완료
                              </span>
                              <span className={idx === 0 ? "text-amber-400 animate-pulse" : "text-gray-500"}>기사매칭완료</span>
                              <span className="text-[10px] font-extrabold text-emerald-400">명탐정 출동중 (30분도착)</span>
                            </div>
                            
                            {/* Track line indicator */}
                            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 transition-all duration-1000 ${
                                  idx === 0 ? "w-4/5" : "w-full"
                                }`}
                              />
                            </div>
                          </div>

                          {idx === 0 && (
                            <div className="mt-2.5 bg-blue-500/10 border border-blue-500/20 py-1.5 px-2.5 rounded-lg">
                              <p className="text-[10px] text-blue-300 font-semibold leading-relaxed">
                                💡 [관할지부 알림]: 대표자 이기식 사장이 서류를 접수해 <strong>{req.subRegion} 전문 파트장</strong>을 연결하였습니다. 기사님의 출발 전화가 곧 도착합니다!
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 text-left">
                <span className="text-[10px] text-gray-400 block font-semibold">24시 무휴 주말/공휴일 상시 대기 출동</span>
                <p className="text-xs text-gray-200 mt-1 font-semibold">
                  인터넷 접수 처리가 지연될 경우 언제든지 통화 버튼 <a href="tel:010-7777-7745" className="text-red-400 font-bold underline hover:text-red-300">010-7777-7745</a> 로 전화를 주시면 즉시 직통 매칭됩니다.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
