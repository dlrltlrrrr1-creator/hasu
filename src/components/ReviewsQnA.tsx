import React, { useState, useEffect } from "react";
import { INITIAL_REVIEWS, FAQ_DATA } from "../data";
import { ReviewItem, QnAItem } from "../types";
import { Star, MessageSquareCode, MessageCircle, HelpCircle, UserPlus, ChevronDown, CheckSquare } from "lucide-react";

export default function ReviewsQnA() {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);

  // New review form states
  const [newName, setNewName] = useState("");
  const [newRegion, setNewRegion] = useState("서울 강남구");
  const [newRating, setNewRating] = useState(5);
  const [newServiceType, setNewServiceType] = useState("하수구 막힘");
  const [newComment, setNewComment] = useState("");
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Q&A states
  const [qnaList, setQnaList] = useState<QnAItem[]>([
    {
      id: "qna-1",
      author: "김태* (서울 서초구)",
      question: "보일러 분배기 쪽 유독 물방울이 맺히는데 출동해서 봐주실 수 있나요?",
      answer: "네! 보일러 분배기는 부식되거나 밸브 고무 가스켓이 낡으면 미세 누수의 요인이 됩니다. 최신 열화상 카메라를 지참하고 당일 즉각 방문해 세밀 진단 후 필요 시 밸브 크기에 맞춰 당일 전격 부분 수리 혹은 통째 교체 성심껏 해결해 드리겠습니다.",
      date: "2026-06-07T12:00:00Z",
      isLocked: false
    }
  ]);
  const [newQuestion, setNewQuestion] = useState("");
  const [newQnaAuthor, setNewQnaAuthor] = useState("");

  useEffect(() => {
    // Sync reviews from localStorage
    const savedReviews = localStorage.getItem("reviews_detective");
    if (savedReviews) {
      try {
        setReviews(JSON.parse(savedReviews));
      } catch (e) {
        setReviews(INITIAL_REVIEWS);
      }
    } else {
      setReviews(INITIAL_REVIEWS);
      localStorage.setItem("reviews_detective", JSON.stringify(INITIAL_REVIEWS));
    }
  }, []);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newComment.trim()) {
      alert("성함과 솔직한 의견을 입력해 주세요!");
      return;
    }

    const review: ReviewItem = {
      id: `rev-${Date.now()}`,
      customerName: newName.trim(),
      region: newRegion,
      rating: newRating,
      serviceType: newServiceType,
      comment: newComment.trim(),
      date: new Date().toISOString().split("T")[0]
    };

    const updated = [review, ...reviews];
    setReviews(updated);
    localStorage.setItem("reviews_detective", JSON.stringify(updated));

    // Reset states
    setNewName("");
    setNewComment("");
    setShowReviewForm(false);
    alert("소중한 고견 감사드립니다! 명탐정 후기에 반영되었습니다.");
  };

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQnaAuthor.trim() || !newQuestion.trim()) {
      alert("성함/지역 과 질문 사항을 채워 주세요!");
      return;
    }

    const item: QnAItem = {
      id: `qna-${Date.now()}`,
      author: newQnaAuthor.trim(),
      question: newQuestion.trim(),
      answer: "명탐정 접수처에서 기사님들께 배관 기술 상담 수령 마친 뒤, 5분 내로 바로 사장님이 문자 배정 피드백과 함께 전화상담을 진행해 드립니다. 조금만 기다려 주십시오!",
      date: new Date().toISOString(),
      isLocked: false
    };

    setQnaList([item, ...qnaList]);
    setNewQnaAuthor("");
    setNewQuestion("");
    alert("기술 문의 질문이 전수 등록되었습니다. 사장님이 확인 후 성심을 다해 유선 연락 올리겠습니다.");
  };

  return (
    <section id="reviews" className="py-16 md:py-24 bg-gray-50 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading Tag */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full mb-3">
            <MessageSquareCode className="w-3.5 h-3.5" />
            <span>투명한 100% 실명 해결 수기</span>
          </div>
          <h3 className="text-3xl font-black text-gray-950 tracking-tight sm:text-4xl">
            고객님들이 증명하는 <span className="text-blue-600">명탐정 성공 후기</span>
          </h3>
          <p className="text-sm sm:text-base text-gray-600 font-medium mt-3 leading-relaxed">
            한 번 인연을 맺은 고객님들은 다시 막힘이 생기면 무조건 저희를 다시 불러주십니다. <br />
            실제 현장에서 대표자 이기식 사장과 엔지니어들이 시원하게 뚫고 보수한 후기입니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left panel: Live reviews listing & Create Review */}
          <div className="lg:col-span-8 space-y-6">
            
            <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
              <span className="text-xs sm:text-sm font-extrabold text-gray-950">
                총 후기 개수: <span className="text-blue-600 font-mono font-black">{reviews.length}</span>개
              </span>
              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs px-4 py-2 rounded-xl shadow-md cursor-pointer transition-colors"
              >
                {showReviewForm ? "후기 작성 취소" : "✍️ 솔직한 이용 후기 작성"}
              </button>
            </div>

            {/* Dynamic write review form */}
            {showReviewForm && (
              <form onSubmit={handleAddReview} className="bg-white border border-blue-100 p-6 rounded-2xl shadow-lg space-y-4 animate-scale-up text-left">
                <h4 className="text-sm sm:text-base font-black text-gray-950">소중한 작업 만족도 평가를 남겨주세요!</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">성함</label>
                    <input
                      type="text"
                      required
                      placeholder="예시: 홍*순"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-100 bg-gray-50 rounded-lg text-xs sm:text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-750 mb-1">방문 지역</label>
                    <input
                      type="text"
                      placeholder="예시: 서울 강서구 등촌동"
                      value={newRegion}
                      onChange={(e) => setNewRegion(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-100 bg-gray-50 rounded-lg text-xs sm:text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">별점 만족도</label>
                    <select
                      value={newRating}
                      onChange={(e) => setNewRating(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-100 bg-gray-50 rounded-lg text-xs sm:text-sm text-gray-950 font-bold focus:outline-none"
                    >
                      <option value={5}>⭐⭐⭐⭐⭐ (매우 만족)</option>
                      <option value={4}>⭐⭐⭐⭐ (만족)</option>
                      <option value={3}>⭐⭐⭐ (보통)</option>
                      <option value={2}>⭐⭐ (미흡)</option>
                      <option value={1}>⭐ (불만족)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">해결받은 세부 서비스</label>
                    <select
                      value={newServiceType}
                      onChange={(e) => setNewServiceType(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-100 bg-gray-50 rounded-lg text-xs sm:text-sm text-gray-900 font-bold focus:outline-none"
                    >
                      <option value="하수구막힘">하수구 막힘 신속통수</option>
                      <option value="누수탐지및수리">정밀 누수탐지 및 당일공사</option>
                      <option value="배관고압세척">초고압 배관 내부 세척</option>
                      <option value="변기교체">프리미엄 위생 양변기 교체</option>
                      <option value="보일러 및 배관교체">보일러 및 수도배관 교체</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">솔직한 평가 후기 수기</label>
                  <textarea
                    required
                    placeholder="배관이 뚫리거나 수전/변기 교체를 통해 만족한 점을 구체적으로 자유롭게 써주세요!"
                    rows={3}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full p-3 border border-gray-100 bg-gray-50 rounded-lg text-xs sm:text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm py-3 rounded-xl transition-all shadow-md"
                >
                  평가 등록 및 사장님께 감사의 마디 전하기
                </button>
              </form>
            )}

            {/* Reviews display stack */}
            <div className="space-y-4">
              {reviews.map((rev) => (
                <div key={rev.id} className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-100 shadow-sm text-left hover:border-blue-100 transition-colors">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-black text-xs">
                        {rev.customerName.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-gray-950">{rev.customerName}</span>
                          <span className="text-[10px] text-gray-400 font-semibold">{rev.region}</span>
                        </div>
                        <div className="flex items-center gap-1 mt-0.5">
                          {Array.from({ length: rev.rating }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
                          ))}
                          <span className="text-[10px] text-gray-500 font-medium ml-1 bg-gray-50 px-1.5 py-0.5 rounded">
                            {rev.serviceType}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] text-gray-400 font-mono font-semibold">{rev.date}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-700 font-semibold leading-relaxed mt-4 bg-blue-50/20 p-3 rounded-xl border border-blue-50/30">
                    &quot;{rev.comment}&quot;
                  </p>

                  <div className="flex items-center justify-between text-[10px] text-gray-400 font-semibold pt-3.5 border-t border-gray-50 mt-4">
                    <span className="text-blue-600 flex items-center gap-1">
                      <CheckSquare className="w-3.5 h-3.5" /> 명탐정 안전 배관 검수 필증 완료
                    </span>
                    <span>방문 담당 기사: 서울/경기 본사 직영 해결팀</span>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right panel: FAQ and Real-time technical Q&A */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Realtime Technical Q&A */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-left">
              <h4 className="text-base font-black text-gray-950 flex items-center gap-2 pb-3 border-b border-gray-100">
                <MessageCircle className="w-5 h-5 text-blue-600" />
                <span>실시간 배관 기술 간질 싹쓸이 Q&amp;A</span>
              </h4>

              <form onSubmit={handleAddQuestion} className="space-y-3 mt-4">
                <input
                  type="text"
                  required
                  placeholder="예: 강남구 역삼동 집주인"
                  value={newQnaAuthor}
                  onChange={(e) => setNewQnaAuthor(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-gray-150 rounded-lg bg-gray-50 focus:outline-none focus:bg-white"
                />
                <textarea
                  required
                  rows={2}
                  placeholder="기술적으로 궁금하신 사항이나 공사 절차가 궁금하신 점을 써주시면 즉각 답변 드립니다!"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  className="w-full text-xs p-3 border border-gray-150 rounded-lg bg-gray-50 focus:outline-none focus:bg-white"
                />
                <button
                  type="submit"
                  className="w-full bg-gray-900 hover:bg-black text-white text-xs font-bold py-2 rounded-lg cursor-pointer transition-colors"
                >
                  질문 남기기 및 즉답 알림 받기
                </button>
              </form>

              {/* QnA listing list */}
              <div className="mt-5 space-y-4 max-h-[220px] overflow-y-auto pr-1">
                {qnaList.map((q) => (
                  <div key={q.id} className="bg-gray-50/50 p-3.5 rounded-xl border border-gray-100 text-xs">
                    <div className="flex justify-between font-bold text-[10.5px]">
                      <span className="text-blue-600 font-bold">{q.author}</span>
                      <span className="text-gray-400">자문대기중</span>
                    </div>
                    <p className="text-[11px] text-gray-700 font-extrabold mt-1">Q. {q.question}</p>
                    
                    {q.answer && (
                      <div className="mt-2.5 pt-2 border-t border-dashed border-gray-200">
                        <p className="text-[10px] text-gray-500 font-semibold leading-relaxed">
                          <strong className="text-blue-700 bg-blue-50 px-1 py-0.5 rounded mr-1">명탐정 이기식 사장 답변:</strong> 
                          {q.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Accordion representation for FAQ */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-left">
              <h4 className="text-base font-black text-gray-950 flex items-center gap-2 pb-3 border-b border-gray-100">
                <HelpCircle className="w-5 h-5 text-blue-600" />
                <span>명탐정 자주 묻는 질문 FAQ</span>
              </h4>

              <div className="mt-4 space-y-2.5">
                {FAQ_DATA.map((faq, i) => {
                  const isOpen = faqOpenIndex === i;
                  return (
                    <div key={i} className="border border-gray-50 rounded-xl overflow-hidden bg-gray-50/30">
                      <button
                        onClick={() => setFaqOpenIndex(isOpen ? null : i)}
                        className="w-full text-left p-3.5 flex items-center justify-between font-bold text-xs sm:text-xs text-gray-900 hover:bg-blue-50/30 transition-colors"
                      >
                        <span className="pr-4 tracking-tight leading-relaxed">{faq.question}</span>
                        <ChevronDown className={`w-4 h-4 shrink-0 text-blue-600 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                      </button>
                      
                      {isOpen && (
                        <div className="px-4 pb-4 pt-1 text-xs text-gray-600 font-medium leading-relaxed border-t border-gray-100 bg-white">
                          💡 {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
