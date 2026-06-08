import React, { useState, useEffect } from "react";
import { X, ShieldCheck, Lock, Phone, MessageSquare, Clipboard, Trash2, CheckCircle, RefreshCcw, LogOut, CheckSquare, PlusCircle, Wrench, Image, BookOpen } from "lucide-react";
import { EstimateRequest, ReviewItem, QnAItem, ServiceItem } from "../types";
import { WORK_SERVICES } from "../data";

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminModal({ isOpen, onClose }: AdminModalProps) {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<"requests" | "reviews" | "qna" | "gallery">("requests");

  // Local state copy for admin processing
  const [requests, setRequests] = useState<EstimateRequest[]>([]);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [qnas, setQnas] = useState<QnAItem[]>([]);
  const [workServices, setWorkServices] = useState<ServiceItem[]>([]);

  // Filter for requests
  const [requestFilter, setRequestFilter] = useState<"all" | "pending" | "confirmed" | "completed">("all");

  // Quick manually added review state
  const [adminReviewName, setAdminReviewName] = useState("");
  const [adminReviewRegion, setAdminReviewRegion] = useState("서울 영등포구");
  const [adminReviewRating, setAdminReviewRating] = useState(5);
  const [adminReviewType, setAdminReviewType] = useState("하수구막힘");
  const [adminReviewComment, setAdminReviewComment] = useState("");

  // Edit Q&A answer state tracker
  const [selectedQnaId, setSelectedQnaId] = useState<string | null>(null);
  const [qnaAnswerText, setQnaAnswerText] = useState("");

  // Gallery editing state trackers
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editImageUrl, setEditImageUrl] = useState("");
  const [editBadges, setEditBadges] = useState("");
  const [editSpecs, setEditSpecs] = useState("");

  const loadAllData = () => {
    // 1. Load Requests
    const savedReqs = localStorage.getItem("estimations_detective");
    setRequests(savedReqs ? JSON.parse(savedReqs) : []);

    // 2. Load Reviews
    const savedRevs = localStorage.getItem("reviews_detective");
    setReviews(savedRevs ? JSON.parse(savedRevs) : []);

    // 3. Load QnAs
    const savedQnas = localStorage.getItem("qna_detective");
    setQnas(savedQnas ? JSON.parse(savedQnas) : []);

    // 4. Load Work Services
    const savedServices = localStorage.getItem("work_services_detective");
    if (savedServices) {
      try {
        setWorkServices(JSON.parse(savedServices));
      } catch (e) {
        setWorkServices(WORK_SERVICES);
      }
    } else {
      setWorkServices(WORK_SERVICES);
      localStorage.setItem("work_services_detective", JSON.stringify(WORK_SERVICES));
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadAllData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "7745" || password === "admin" || password === "0000") {
      setIsAuthenticated(true);
      setPassword("");
    } else {
      alert("비밀번호가 올바르지 않습니다! 대표번호 뒷자리 '7745'를 입력해 주세요.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    onClose();
  };

  const notifyUpdates = () => {
    window.dispatchEvent(new CustomEvent("detective_data_updated"));
  };

  // ----- Gallery Handlers -----
  const startEditService = (service: ServiceItem) => {
    setEditingServiceId(service.id);
    setEditTitle(service.title);
    setEditDesc(service.description);
    setEditImageUrl(service.imageUrl);
    setEditBadges(service.badges.join(", "));
    setEditSpecs(service.specs.join("\n"));
  };

  const handleSaveService = (id: string) => {
    if (!editTitle.trim() || !editDesc.trim() || !editImageUrl.trim()) {
      alert("제목, 설명, 이미지 주소 등 핵심 정보는 필수 채워야 합니다.");
      return;
    }

    const updated = workServices.map((s) => {
      if (s.id === id) {
        return {
          ...s,
          title: editTitle.trim(),
          description: editDesc.trim(),
          imageUrl: editImageUrl.trim(),
          badges: editBadges.split(",").map((b) => b.trim()).filter((b) => b.length > 0),
          specs: editSpecs.split("\n").map((sp) => sp.trim()).filter((sp) => sp.length > 0),
        };
      }
      return s;
    });

    setWorkServices(updated);
    localStorage.setItem("work_services_detective", JSON.stringify(updated));
    setEditingServiceId(null);
    notifyUpdates();
    alert("작업 갤러리 해당 항목 정보가 즉각 업데이트/저장 완료되었습니다!");
  };

  // ----- Request Handlers -----
  const updateRequestStatus = (id: string, newStatus: "pending" | "confirmed" | "completed") => {
    const updated = requests.map((req) => (req.id === id ? { ...req, status: newStatus } : req));
    setRequests(updated);
    localStorage.setItem("estimations_detective", JSON.stringify(updated));
    notifyUpdates();
  };

  const deleteRequest = (id: string) => {
    if (!window.confirm("정말 이 접수 내역을 영구 삭제하시겠습니까?")) return;
    const updated = requests.filter((req) => req.id !== id);
    setRequests(updated);
    localStorage.setItem("estimations_detective", JSON.stringify(updated));
    notifyUpdates();
  };

  // ----- Review Handlers -----
  const deleteReview = (id: string) => {
    if (!window.confirm("정말 이 고유 리뷰를 삭제하시겠습니까?")) return;
    const updated = reviews.filter((rev) => rev.id !== id);
    setReviews(updated);
    localStorage.setItem("reviews_detective", JSON.stringify(updated));
    notifyUpdates();
  };

  const addAdminReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminReviewName || !adminReviewComment) {
      alert("성함과 후기 수기 내용을 다 입력해 주세요.");
      return;
    }

    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      customerName: adminReviewName,
      region: adminReviewRegion,
      rating: adminReviewRating,
      serviceType: adminReviewType,
      comment: adminReviewComment,
      date: new Date().toISOString().split("T")[0],
    };

    const updated = [newRev, ...reviews];
    setReviews(updated);
    localStorage.setItem("reviews_detective", JSON.stringify(updated));
    notifyUpdates();

    // Reset Form
    setAdminReviewName("");
    setAdminReviewComment("");
    alert("관리자 권한 수동 후기가 등록되었습니다!");
  };

  // ----- Q&A Handlers -----
  const handleAnswerSubmit = (qnaId: string) => {
    if (!qnaAnswerText.trim()) {
      alert("답변을 입력해 주세요!");
      return;
    }

    const updated = qnas.map((q) =>
      q.id === qnaId ? { ...q, answer: qnaAnswerText.trim() } : q
    );
    setQnas(updated);
    localStorage.setItem("qna_detective", JSON.stringify(updated));
    notifyUpdates();

    setSelectedQnaId(null);
    setQnaAnswerText("");
    alert("이기식 사장님의 명탐정 고품질 자문 답변이 전수 등록 완료되었습니다!");
  };

  const deleteQna = (id: string) => {
    if (!window.confirm("이 Q&A 질문글을 완전히 삭제하시겠습니까?")) return;
    const updated = qnas.filter((q) => q.id !== id);
    setQnas(updated);
    localStorage.setItem("qna_detective", JSON.stringify(updated));
    notifyUpdates();
  };

  const filteredRequests = requests.filter((r) => {
    if (requestFilter === "all") return true;
    return r.status === requestFilter;
  });

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl h-[92vh] sm:h-[85vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-100 animate-scale-up">
        
        {/* Modal Outer Header */}
        <div className="bg-slate-950 text-white px-6 py-4 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="font-black text-sm sm:text-base tracking-tight">
              하수 누수 명탐정 스마트 관리실 <span className="text-xs bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full ml-1">이기식 대표</span>
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Auth Gateway Layer (if not verified yet) */}
        {!isAuthenticated ? (
          <div className="flex-1 overflow-y-auto flex flex-col items-center justify-center p-8 bg-slate-50 text-center">
            <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-4 border border-blue-100 shadow-sm animate-bounce">
              <Lock className="w-7 h-7" />
            </div>
            <h4 className="text-xl font-black text-slate-900">대표자 전용 스마트 안전 로크인</h4>
            <p className="text-xs text-slate-500 font-semibold max-w-sm mt-2 leading-relaxed">
              도착 주소와 연락처 안전 확인 및 답변 작성은 이기식 사장님 안전 인증번호 점검을 필요로 합니다.
            </p>

            <form onSubmit={handleLogin} className="w-full max-w-xs mt-6 space-y-3">
              <input
                type="password"
                required
                autoFocus
                placeholder="비밀번호(대표전화 뒷자리 4자리)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-center px-4 py-3 bg-white border border-gray-200 rounded-xl font-mono text-sm tracking-wider focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent placeholder:text-gray-300 shadow-sm"
              />
              <button
                type="submit"
                className="w-full bg-slate-950 hover:bg-slate-800 text-white text-xs sm:text-sm font-black py-3 rounded-xl transition-all shadow-md mt-1 cursor-pointer"
              >
                관리 안전 인증 완료 후 접속하기
              </button>
            </form>

            <span className="text-[10px] text-gray-400 font-semibold mt-4 bg-gray-100 px-3 py-1 rounded-full">
              💡 초기 암호 힌트: 대표 긴급 통수 회신 직통 번호 뒷날개 4자리 (7745)
            </span>
          </div>
        ) : (
          /* Main Dashboard Layout once logged in */
          <div className="flex-1 flex flex-col min-h-0 bg-slate-50">
            {/* Quick summary band / Tab headers */}
            <div className="bg-slate-900 text-white px-6 py-2.5 flex flex-wrap gap-2 items-center justify-between text-xs sm:text-xs">
              <div className="flex items-center gap-4 text-slate-300 font-semibold">
                <span>긴급 접수: <strong className="text-red-400 font-bold">{requests.length}건</strong></span>
                <span>실명 후기: <strong className="text-blue-400 font-bold">{reviews.length}개</strong></span>
                <span>현장 Q&A: <strong className="text-emerald-400 font-bold">{qnas.length}건</strong></span>
                <span>작업 갤러리: <strong className="text-amber-400 font-bold">{workServices.length}개</strong></span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-[11px] font-bold text-red-400 hover:text-red-300 bg-red-950/40 px-2.5 py-1 rounded-lg transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>승인 해제 (로그아웃)</span>
              </button>
            </div>

            {/* Main Tabs Segment Control */}
            <div className="bg-white border-b border-gray-100 flex p-2 gap-1.5 shrink-0 select-none">
              <button
                onClick={() => setActiveTab("requests")}
                className={`flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl font-black text-xs sm:text-xs cursor-pointer transition-all ${
                  activeTab === "requests"
                    ? "bg-blue-600 text-white shadow-md shadow-blue-100"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Phone className="w-4 h-4" />
                <span>📞 긴급 접수 ({requests.length})</span>
              </button>

              <button
                onClick={() => setActiveTab("reviews")}
                className={`flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl font-black text-xs sm:text-xs cursor-pointer transition-all ${
                  activeTab === "reviews"
                    ? "bg-blue-600 text-white shadow-md shadow-blue-100"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>🗣️ 이용후기 ({reviews.length})</span>
              </button>

              <button
                onClick={() => setActiveTab("qna")}
                className={`flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl font-black text-xs sm:text-xs cursor-pointer transition-all ${
                  activeTab === "qna"
                    ? "bg-blue-600 text-white shadow-md shadow-blue-100"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <CheckSquare className="w-4 h-4" />
                <span>💬 Q&A 답변 ({qnas.length})</span>
              </button>

              <button
                onClick={() => setActiveTab("gallery")}
                className={`flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl font-black text-xs sm:text-xs cursor-pointer transition-all ${
                  activeTab === "gallery"
                    ? "bg-blue-600 text-white shadow-md shadow-blue-100"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Wrench className="w-4 h-4" />
                <span>🚧 작업 갤러리 변경 ({workServices.length})</span>
              </button>
            </div>

            {/* TAB CONTENTS PANEL */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 min-h-0">
              
              {/* TAB 1: EMERGENCY REQUESTS LIST */}
              {activeTab === "requests" && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center flex-wrap gap-2 pb-2">
                    <h5 className="font-extrabold text-sm text-slate-800">
                      🚨 실시간 배관 견적 및 급파 청구리스트
                    </h5>
                    {/* Filters */}
                    <div className="flex gap-1 bg-white p-1 rounded-xl border border-gray-150 text-[10.5px] font-bold">
                      <button
                        onClick={() => setRequestFilter("all")}
                        className={`px-2.5 py-1 rounded-lg ${requestFilter === "all" ? "bg-slate-900 text-white" : "text-gray-500"}`}
                      >
                        전체
                      </button>
                      <button
                        onClick={() => setRequestFilter("pending")}
                        className={`px-2.5 py-1 rounded-lg ${requestFilter === "pending" ? "bg-amber-500 text-white" : "text-gray-500"}`}
                      >
                        대기중
                      </button>
                      <button
                        onClick={() => setRequestFilter("confirmed")}
                        className={`px-2.5 py-1 rounded-lg ${requestFilter === "confirmed" ? "bg-blue-600 text-white" : "text-gray-500"}`}
                      >
                        상담/출동
                      </button>
                      <button
                        onClick={() => setRequestFilter("completed")}
                        className={`px-2.5 py-1 rounded-lg ${requestFilter === "completed" ? "bg-green-600 text-white" : "text-gray-500"}`}
                      >
                        완료
                      </button>
                    </div>
                  </div>

                  {filteredRequests.length === 0 ? (
                    <div className="bg-white p-12 text-center rounded-2xl border border-dashed border-gray-200 text-slate-400 font-medium text-xs">
                      선택하신 상태에 수렴하는 긴급 접수가 없습니다.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-4">
                      {filteredRequests.map((req) => (
                        <div
                          key={req.id}
                          className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row justify-between gap-4 text-left hover:border-blue-300 transition-colors"
                        >
                          <div className="space-y-1 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-black text-sm text-slate-950">
                                {req.customerName} 고객님
                              </span>
                              <span className="text-xs text-blue-600 font-extrabold bg-blue-50 px-2 py-0.5 rounded">
                                {req.region} &gt; {req.subRegion}
                              </span>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ml-auto md:ml-0 ${
                                req.status === "pending"
                                  ? "bg-amber-500/10 text-amber-600"
                                  : req.status === "confirmed"
                                  ? "bg-blue-500/10 text-blue-600 p-0.5"
                                  : "bg-green-500/10 text-green-600"
                              }`}>
                                {req.status === "pending" ? "🔔 접수대기" : req.status === "confirmed" ? "🔄 시공상담/출동중" : "✅ 해결완료"}
                              </span>
                            </div>
                            
                            <p className="text-xs text-slate-500 font-extrabold font-mono pt-1">
                              📞 연락처: <a href={`tel:${req.phone}`} className="text-blue-600 underline text-sm">{req.phone}</a>
                            </p>
                            <p className="text-xs text-slate-800 font-semibold bg-slate-50 p-2 rounded-lg border border-slate-100 mt-2">
                              📋 <strong className="text-blue-700">신청내비:</strong> {req.serviceType}
                              <br />
                              💬 <strong className="text-slate-600">증상기술:</strong> {req.customDescription}
                            </p>
                            <p className="text-[10px] text-gray-400 font-mono font-semibold pt-1">
                              접수 시각: {req.createdAt}
                            </p>
                          </div>

                          {/* Quick Admin controls per request */}
                          <div className="flex md:flex-col justify-end gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 md:border-l border-slate-150 pl-0 md:pl-4">
                            <button
                              onClick={() => updateRequestStatus(req.id, "confirmed")}
                              className="flex-1 md:flex-none bg-blue-550 hover:bg-blue-600 text-blue-700 bg-blue-50 hover:bg-blue-105 text-[11px] font-black px-3 py-1.5 rounded-lg border border-blue-200 transition-colors"
                            >
                              🔄 상담/기사 배정
                            </button>
                            <button
                              onClick={() => updateRequestStatus(req.id, "completed")}
                              className="flex-1 md:flex-none bg-green-550 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 text-[11px] font-black px-3 py-1.5 rounded-lg border border-emerald-200 transition-colors"
                            >
                              ✅ 작업완료 처리
                            </button>
                            <button
                              onClick={() => deleteRequest(req.id)}
                              className="px-2 py-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                              title="삭제"
                            >
                              <Trash2 className="w-4 h-4 mx-auto" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: REVIEW MONITORING & MANUAL INSERTS */}
              {activeTab === "reviews" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left Column: Register Offline or Custom Handwork Review */}
                  <form onSubmit={addAdminReview} className="lg:col-span-5 bg-white p-5 rounded-2xl border border-gray-150 space-y-3.5 text-left h-fit sticky top-0">
                    <h5 className="font-extrabold text-sm text-slate-800 flex items-center gap-1">
                      <PlusCircle className="w-4 h-4 text-blue-600" />
                      <span>오프라인 단골 후기 대리 등록</span>
                    </h5>
                    <p className="text-[10px] text-gray-400 leading-relaxed font-semibold">
                      전화로 구두 안사를 전해주신 어르신이나 단골 아파트 고객님의 소중한 후기를 대신 등록하는 공간입니다.
                    </p>

                    <div>
                      <label className="block text-[10px] font-bold text-gray-700 mb-0.5">성함</label>
                      <input
                        type="text"
                        required
                        placeholder="예시: 권*옥 (동작동)"
                        value={adminReviewName}
                        onChange={(e) => setAdminReviewName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 bg-gray-50 rounded-lg text-xs"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-bold text-gray-700 mb-0.5">방문 지역</label>
                        <input
                          type="text"
                          required
                          value={adminReviewRegion}
                          onChange={(e) => setAdminReviewRegion(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 bg-gray-50 rounded-lg text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-700 mb-0.5">만족 별점</label>
                        <select
                          value={adminReviewRating}
                          onChange={(e) => setAdminReviewRating(Number(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-200 bg-gray-50 rounded-lg text-xs focus:outline-none"
                        >
                          <option value={5}>⭐⭐⭐⭐⭐ 5</option>
                          <option value={4}>⭐⭐⭐⭐ 4</option>
                          <option value={3}>⭐⭐⭐ 3</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-gray-700 mb-0.5">해결 서비스</label>
                      <select
                        value={adminReviewType}
                        onChange={(e) => setAdminReviewType(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 bg-gray-50 rounded-lg text-xs focus:outline-none"
                      >
                        <option value="하수구막힘">하수구막힘</option>
                        <option value="배관수리">배관수리</option>
                        <option value="배관고압세척">배관고압세척</option>
                        <option value="누수탐지및수리">누수탐지및수리</option>
                        <option value="펌프수리교체">펌프수리교체</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-gray-700 mb-0.5">솔직 소감 기술</label>
                      <textarea
                        required
                        rows={2}
                        placeholder="이웃집 소백천 문제였는데 탐지기로 한번에 짚어주셔서 물이 싹 멎었네요..."
                        value={adminReviewComment}
                        onChange={(e) => setAdminReviewComment(e.target.value)}
                        className="w-full p-2.5 border border-gray-200 bg-gray-50 rounded-lg text-xs"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black text-xs py-2 rounded-xl transition-all shadow-md"
                    >
                      대표자 추천 대리 후기 등록
                    </button>
                  </form>

                  {/* Right Column: Review list & Deletion management */}
                  <div className="lg:col-span-7 space-y-3">
                    <h5 className="font-extrabold text-sm text-slate-800 text-left">
                      📋 현재 홈페이지 게재 및 차단 후기 리스트
                    </h5>
                    
                    <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                      {reviews.map((rev) => (
                        <div key={rev.id} className="bg-white p-3.5 rounded-xl border border-gray-200 text-left relative flex justify-between gap-2">
                          <div className="space-y-1">
                            <div className="flex items-center gap-1 flex-wrap">
                              <strong className="text-xs text-slate-950">{rev.customerName}</strong>
                              <span className="text-[10px] text-gray-400">({rev.region})</span>
                              <span className="text-[10px] bg-blue-50 text-blue-600 px-1 py-0.5 rounded font-mono">
                                {rev.serviceType}
                              </span>
                            </div>
                            <p className="text-xs text-slate-700 font-medium leading-normal italic bg-slate-50 p-2 rounded-lg">
                              &quot;{rev.comment}&quot;
                            </p>
                            <span className="text-[9.5px] text-gray-400 block">{rev.date} 등록됨</span>
                          </div>
                          
                          <button
                            onClick={() => deleteReview(rev.id)}
                            className="bg-red-50 hover:bg-red-105 p-2 rounded-lg text-red-500 self-center shrink-0 border border-red-100 cursor-pointer"
                            title="후기 삭제"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: Q&A ANSWERS & CORRECTIONS */}
              {activeTab === "qna" && (
                <div className="space-y-4">
                  <h5 className="font-extrabold text-sm text-slate-800 text-left">
                    💬 실시간 접수 질문 및 명탐정 대표 자문 답변
                  </h5>

                  <div className="space-y-4">
                    {qnas.map((q) => (
                      <div key={q.id} className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm text-left">
                        <div className="flex justify-between items-center bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                          <div>
                            <span className="text-xs font-bold text-blue-600">{q.author}</span>
                            <span className="text-[10px] text-gray-400 ml-2">{new Date(q.date).toLocaleString()}</span>
                          </div>
                          
                          <button
                            onClick={() => deleteQna(q.id)}
                            className="text-red-500 hover:text-red-700 p-1"
                            title="삭제"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="mt-3">
                          <p className="text-xs font-black text-slate-900 bg-amber-500/5 px-2 py-1 rounded inline-block">질문</p>
                          <p className="text-xs sm:text-sm text-slate-800 font-extrabold mt-1 pl-1">
                            Q. {q.question}
                          </p>
                        </div>

                        {/* Existing Answer representation */}
                        <div className="mt-4 pt-3 border-t border-dashed border-gray-150 bg-blue-50/10 p-3 rounded-xl border border-blue-50/40">
                          <p className="text-xs font-black text-blue-700 inline-block bg-blue-50 px-1.5 py-0.5 rounded">현재 대표자 답변</p>
                          <p className="text-xs text-slate-600 font-medium leading-relaxed mt-1 pl-1">
                            {q.answer ? q.answer : <span className="text-red-500 font-bold">등록된 공식 자문이 아직 없습니다. 답변을 달아주세요!</span>}
                          </p>
                        </div>

                        {/* Expandable expert response form inline */}
                        {selectedQnaId === q.id ? (
                          <div className="mt-4 space-y-2 animate-scale-up">
                            <textarea
                              rows={3}
                              placeholder="이기식 대표님의 고품격 배관 노하우가 담긴 실제 해결 방침 답변을 상세하게 작성해 주세요."
                              value={qnaAnswerText}
                              onChange={(e) => setQnaAnswerText(e.target.value)}
                              className="w-full text-xs p-3 border border-blue-250 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white shadow-inner"
                            />
                            <div className="flex gap-2 justify-end">
                              <button
                                onClick={() => setSelectedQnaId(null)}
                                className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold px-3 py-1.5 rounded-lg"
                              >
                                취소
                              </button>
                              <button
                                onClick={() => handleAnswerSubmit(q.id)}
                                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-1.5 rounded-lg shadow-sm"
                              >
                                답변 승인 및 반영하기
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="mt-3 flex justify-end">
                            <button
                              onClick={() => {
                                setSelectedQnaId(q.id);
                                setQnaAnswerText(q.answer || "");
                              }}
                              className="bg-slate-900 hover:bg-black text-white text-xs font-black px-4 py-1.5 rounded-lg shadow-sm transition-colors cursor-pointer"
                            >
                              ✍️ {q.answer ? "대표 답변 수정하기" : "실시간 자문 답변달기"}
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: WORK GALLERY MANAGEMENT */}
              {activeTab === "gallery" && (
                <div className="space-y-6">
                  <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl flex items-start gap-3 text-left">
                    <span className="text-xl">💡</span>
                    <div>
                      <h6 className="font-extrabold text-xs sm:text-sm text-blue-900">
                        작업 갤러리 스마트 콘텐츠 관리
                      </h6>
                      <p className="text-[11px] sm:text-xs text-blue-700 font-medium leading-relaxed mt-1">
                        이곳에서 수정 선언하는 제목, 태그, 소견 및 설명 설명글은 방문객용 메인 화면의 [명탐정 정밀 진단 작업 갤러리]에 즉각 무점검 실시간 반영 처리됩니다!
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {workServices.map((s) => (
                      <div key={s.id} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm text-left relative overflow-hidden">
                        {editingServiceId === s.id ? (
                          /* Active Edit Form for this specific item */
                          <div className="space-y-4 animate-scale-up">
                            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex justify-between items-center mb-2">
                              <span className="text-xs font-bold text-slate-700 bg-slate-200 px-2.5 py-1 rounded">항목 ID: {s.id}</span>
                              <span className="text-xs text-blue-600 font-extrabold">✏️ 실시간 편집 모드</span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-1 font-sans">
                                <label className="text-[11px] font-black text-slate-700 block">작업 명칭 (제목)</label>
                                <input
                                  type="text"
                                  value={editTitle}
                                  onChange={(e) => setEditTitle(e.target.value)}
                                  className="w-full text-xs p-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:outline-none bg-white font-bold"
                                  placeholder="예: 싱크대 하수구 완전 소통"
                                />
                              </div>

                              <div className="space-y-1 font-sans">
                                <label className="text-[11px] font-black text-slate-700 block">해시태그 배지 (쉼표 구분)</label>
                                <input
                                  type="text"
                                  value={editBadges}
                                  onChange={(e) => setEditBadges(e.target.value)}
                                  className="w-full text-xs p-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:outline-none bg-white font-medium text-blue-600"
                                  placeholder="예: 강력통수, 고압스케일, 당일즉시"
                                />
                              </div>
                            </div>

                            <div className="space-y-1 font-sans">
                              <label className="text-[11px] font-black text-slate-700 block">정밀 진단 현장 이미지 주소 (URL)</label>
                              <input
                                type="text"
                                value={editImageUrl}
                                onChange={(e) => setEditImageUrl(e.target.value)}
                                className="w-full text-xs p-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:outline-none bg-white font-mono"
                                placeholder="/src/assets/images/... 혹은 웹 이미지 링크"
                              />
                              {editImageUrl && (
                                <div className="mt-2 text-left">
                                  <p className="text-[10px] text-slate-400 mb-1">미리보기 (Preview):</p>
                                  <img src={editImageUrl} alt="preview" className="h-20 w-32 object-cover rounded-lg border border-gray-200" referrerPolicy="no-referrer" />
                                </div>
                              )}
                            </div>

                            <div className="space-y-1 font-sans">
                              <label className="text-[11px] font-black text-slate-700 block">작업 설명 (소견글)</label>
                              <textarea
                                rows={3}
                                value={editDesc}
                                onChange={(e) => setEditDesc(e.target.value)}
                                className="w-full text-xs p-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:outline-none bg-white font-medium leading-relaxed"
                                placeholder="현장 상태 진단과 해결 방법에 대해서 상세하게 적어 주세요."
                              />
                            </div>

                            <div className="space-y-1 font-sans">
                              <label className="text-[11px] font-black text-slate-700 block">장비 및 상세 시공법 가이드 목록 (줄바꿈 단위로 입력)</label>
                              <textarea
                                rows={4}
                                value={editSpecs}
                                onChange={(e) => setEditSpecs(e.target.value)}
                                className="w-full text-xs p-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:outline-none bg-white font-mono leading-relaxed"
                                placeholder="예:&#10;플렉스 샤프트 스케일링 완전 통수&#10;정밀 배관 내시경 실시간 검증&#10;250바 엔진형 초고압 청소"
                              />
                            </div>

                            <div className="flex gap-2 justify-end pt-2">
                              <button
                                onClick={() => setEditingServiceId(null)}
                                className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold px-4 py-2 rounded-lg"
                              >
                                취소
                              </button>
                              <button
                                onClick={() => handleSaveService(s.id)}
                                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-black px-5 py-2 rounded-lg shadow-md"
                              >
                                💾 이 공종 정보 업데이트 저장
                              </button>
                            </div>
                          </div>
                        ) : (
                          /* Read-Only Mode showing existing template information */
                          <div className="flex flex-col sm:flex-row gap-5 items-start">
                            <div className="w-full sm:w-40 shrink-0 aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                              <img
                                src={s.imageUrl}
                                alt={s.title}
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                            </div>

                            <div className="flex-1 space-y-2">
                              <div className="flex items-center justify-between flex-wrap gap-2">
                                <h6 className="font-extrabold text-sm sm:text-base text-gray-900">{s.title}</h6>
                                <button
                                  onClick={() => startEditService(s)}
                                  className="bg-slate-900 hover:bg-black text-white text-xs font-black px-3.5 py-1.5 rounded-lg flex items-center gap-1 transition-all cursor-pointer"
                                >
                                  ✍️ 이 공정 수정하기
                                </button>
                              </div>

                              <div className="flex flex-wrap gap-1 font-sans">
                                {s.badges.map((b, idx) => (
                                  <span key={idx} className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded border border-blue-100">
                                    #{b}
                                  </span>
                                ))}
                              </div>

                              <p className="text-xs text-gray-600 font-medium leading-relaxed">{s.description}</p>

                              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 space-y-1">
                                <p className="text-[10px] font-black text-slate-500">🔧 권장 시공법 리스트</p>
                                <ul className="list-disc list-inside text-[11px] text-gray-600 space-y-0.5 pl-1">
                                  {s.specs.map((sp, idx) => (
                                    <li key={idx}>{sp}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
