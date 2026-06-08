import { ServiceItem, ReviewItem } from "./types";

export const WORK_SERVICES: ServiceItem[] = [
  {
    id: "sewer-blockage",
    title: "하수구 막힘",
    category: "work",
    description: "막히고 역류하는 하수구를 첨단 내시경 장비로 원인 분석 후 배관 손상 없이 깨끗하게 통수해 드립니다.",
    badges: ["강력통수", "내시경확인", "24시긴급"],
    specs: ["최신 배관 플렉스 샤프트 스케일링", "내시경 카메라 내부 진입 분석", "기름 유지방 완벽 분쇄"],
    imageUrl: "/src/assets/images/sewer_block_kr_1780892655250.png"
  },
  {
    id: "pipe-repair",
    title: "배관 수리",
    category: "work",
    description: "노후되고 파손되어 누수가 발생하는 급수/하수 배관을 내구성 높은 최신 자재로 안전하게 교체 및 보수합니다.",
    badges: ["부분보수", "전체교체", "배관용접"],
    specs: ["안전한 에이콘(PB) / 멀티조인트 시공", "노후 아파트/상가 가지관 완전 보수", "수압 테스트 및 이중 밀폐 검증"],
    imageUrl: "/src/assets/images/pipe_repair_kr_1780892669728.png"
  },
  {
    id: "high-pressure-jetting",
    title: "배관 고압 세척",
    category: "work",
    description: "배관 내부의 딱딱하게 굳은 기름덩어리와 이물질을 고압의 물줄기로 새 배관처럼 깨끗하게 청소합니다.",
    badges: ["배관스케일링", "상가/공장전문", "자주식노즐"],
    specs: ["250바(bar) 이상 초고압 분사 차량 동원", "배관 벽면 흡착 스케일 완전 제거", "빌라/상가/대형 식당 정기 세척 서비스"],
    imageUrl: "/src/assets/images/high_pressure_kr_1780892686215.png"
  },
  {
    id: "pipe-detection",
    title: "배관 관로 탐지",
    category: "work",
    description: "땅속이나 콘크리트 벽 속에 감춰져 찾기 힘든 하수 및 수도 배관의 정확한 매립 경로와 깊이를 탐지합니다.",
    badges: ["정밀위치추적", "굴착범위최소화", "최첨단송신기"],
    specs: ["송신기(Sonde) 탑재 고성능 하수구 탐지", "정확한 굴착 지점 마킹으로 공사비 절감", "도면 유실 배관 완전 복제 탐지"],
    imageUrl: "/src/assets/images/pipe_detect_kr_1780892702084.png"
  },
  {
    id: "leak-detection",
    title: "누수 탐지 및 수리",
    category: "work",
    description: "미세한 청음식 탐지기 및 가스 탐지기를 동원하여 물 새는 정확한 지점을 완벽 색출 및 당일 임시보수 완료합니다.",
    badges: ["가스식탐지", "청음식탐지", "손해보험청구증빙"],
    specs: ["수소 혼합가스 추적 정밀 가스 탐지", "초미세 누수음 포착용 최신 청음기 사용", "일상생활배상책임 보험 서류 완벽 제공"],
    imageUrl: "/src/assets/images/leak_detect_kr_1780892715677.png"
  },
  {
    id: "pump-repair-replace",
    title: "펌프 수리 및 교체",
    category: "work",
    description: "가정용 메인 가압 펌프, 배수 펌프, 지하실 집수조 펌프 고장 시 즉각 수리 및 고수명 펌프로 교체 시공합니다.",
    badges: ["가정용가압", "배수집수조", "자동컨트롤러"],
    specs: ["한일/윌로 펌프 정품 모터 교체", "수위 감지 오뚜기 센서 및 컨트롤러 정비", "무소음/저진동 소형 가압펌프 전문 시공"],
    imageUrl: "/src/assets/images/pump_repair_kr_1780892728666.png"
  }
];

export const INSTALLATION_SERVICES: ServiceItem[] = [
  {
    id: "toilet-replacement",
    title: "변기 교체",
    category: "installation",
    description: "금 가거나 노후화된 양변기를 위생적이고 물 내림이 시원한 최신 브랜드 원피스/투피스 모델로 전면 교체합니다.",
    badges: ["대림바스", "계림요업", "냄새차단정심"],
    specs: ["편심/정심 차단 시공으로 악취 완벽 방지", "수평계 정밀 계측을 통한 화이트실리콘/마감", "절수형 하이 탱크 절수 기능 포함"],
    imageUrl: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "toilet-parts",
    title: "변기 부속 교체",
    category: "installation",
    description: "변기 물탱크 내부 부속 고장으로 생기는 누수, 소음, 물 안 멈춤 문제를 신속히 국산 KS 규격 정품 부속으로 해결합니다.",
    badges: ["국산정품", "소음해결", "당일시공"],
    specs: ["오버플로우 필밸브 및 볼탑 세트 교체", "플러시 밸브 및 고무 패킹 부식 방지 자재", "고장 없이 오래 쓰는 KS 인증 부품"],
    imageUrl: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "sink-parts",
    title: "싱크대 부속 교체",
    category: "installation",
    description: "음식물 찌든 때와 악취 배출구 역할을 하는 낡은 싱크대 배수구 플라스틱/스텐 통 및 주름관을 청결히 올 교환합니다.",
    badges: ["악취트랩", "올스텐싱크배수구", "당일교체"],
    specs: ["음식물 때가 끼지 않는 위생적인 올스텐 배수구", "하부 악취 차단 s트랩 / 전용 역류 방지 시공", "싱크대 볼 찌든 오염 밀봉 세척"],
    imageUrl: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "faucet-replacement",
    title: "수전 교체",
    category: "installation",
    description: "물샘, 뻑뻑한 핸들, 수압 저하가 발생한 주방 / 욕실 / 세면대 수전을 녹슬지 않는 친환경 프리미엄 수전으로 교체합니다.",
    badges: ["싱크 거위목수전", "해바라기수전", "우수한내구성"],
    specs: ["황동 크롬 도금 최고급 세라믹 카트리지", "원홀/벽붙이 주방 스프레이형 풀세트", "사용이 편리한 고급 호스 연장 타입"],
    imageUrl: "https://images.unsplash.com/photo-1615876234886-fd9a39fda97f?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "water-pipe-replacement",
    title: "수도 배관 교체",
    category: "installation",
    description: "녹물이나 잦은 미세누수의 주범인 엑셀/철관 등 노후된 세대 내 전체 온수/냉수 수도 배관을 위생적인 자재로 전체 교체합니다.",
    badges: ["녹물차단", "안전원료관", "전체관교체"],
    specs: ["녹 걱정 없는 무독성 PB 에이콘 배관 사용", "수압 저하 없는 완벽 분배기 교체 설계", "깔끔한 벽면 인입 마감 및 단열 강화"],
    imageUrl: "https://images.unsplash.com/photo-1542013936-693-8848e5744a70?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "boiler-replacement",
    title: "보일러 교체",
    category: "installation",
    description: "노후로 효율이 떨어지고 난방비가 올라간 보일러를 정부 보조금 신청 연계 및 1등급 가스 친환경 콘덴싱 보일러로 설치 지원합니다.",
    badges: ["에너지1등급", "정부보조금지원", "난방배관청소서비스"],
    specs: ["경동나비엔 / 귀뚜라미 / 린나이 공식 대리점 연계", "일산화탄소 경보기 의무 준수 안전 보증", "기존 배관 찌꺼기 제거 난방 배관 무료 청소"],
    imageUrl: "https://images.unsplash.com/photo-1585128719715-46776b56a0d1?auto=format&fit=crop&w=600&q=80"
  }
];

export const FAQ_DATA = [
  {
    question: "서울, 경기 지역 정말 30분~1시간 내에 오시나요?",
    answer: "네! 서울 및 경기 주요 지역에 구역별로 즉시 출동 기사님이 상시 대기하고 있어, 접수 완료 후 가장 가까운 명탐정 엔지니어가 비상 사이렌처럼 로켓 방문을 목표로 30분~1시간 이내에 현장에 도착합니다. (도로 사정에 따라 약간 변동될 수 있습니다.)"
  },
  {
    question: "비용 산정은 어떻게 되나요? 바가지는 없나요?",
    answer: "하수 누수 명탐정은 투명성을 원칙으로 합니다. 현장 도착 후 최첨단 장비(배관 내시경 등)를 사용해 정확히 상태를 파악한 뒤, 작업을 시작하기 '전'에 고객님께 가격을 명확하게 고지해 드립니다. 합의되지 않은 유료 추가 작업은 절대 하지 않습니다."
  },
  {
    question: "작업 비용이 추가 청구되거나 변동되나요?",
    answer: "현장 작업을 시작하기 전에 내시경 및 탐지 장비로 점검 후 상세 견적과 기술 소견을 고객님과 상의합니다. 동의하신 청구 요금 외에 일방적이거나 불합리한 추가 비용은 청구하지 않으니 안심하고 대기해 주셔도 좋습니다."
  },
  {
    question: "누수 공사 시 이웃집 천장 피해보상 보험 처리가 가능한가요?",
    answer: "네, 가능합니다! 일상생활배상책임특약(주택화재보험, 실비보험 등)이 있으시다면 서류 증빙을 통해 누수 원인 복구 공사 비용 및 아랫집 피해 보상까지 청구하실 수 있습니다. 필요한 기술 소견서, 공사 전후 사진, 영수증 등 복잡한 보험 증빙 서류 일체를 꼼꼼하게 작성해 드립니다."
  }
];

export const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: "rev-1",
    customerName: "김*호",
    region: "경기 성남시 분당구",
    rating: 5,
    serviceType: "누수 탐지 및 수리",
    comment: "아파트 아랫집 천장에 물이 샌다고 해서 밤잠 설쳤는데, 전용 특수 관로 가스 탐지기와 청음기 들고 오셔서 15분 만에 싱크대 아래 미세 온수관 누수 포인트를 찾아내셨어요! 바로 바닥 최소로 깨고 완벽 용접 수리까지 완료해 주셨습니다. 일상생활배상책임 보험 청구용 서류도 다 챙겨주셔서 제 돈 거의 안 들고 수리했어요. 대표님 정말 감사합니다!",
    date: "2026-05-24"
  },
  {
    id: "rev-2",
    customerName: "이*순",
    region: "서울 강남구 역삼동",
    rating: 5,
    serviceType: "하수구 막힘 + 배관 고압 세척",
    comment: "상가 화장실 하수구가 완전히 꽉 역류해서 손님들이 난리가 났었어요. 여러 업체에 전화했지만 2시간 넘게 걸린댔는데 하수 누수 명탐정에 연락하자마자 강남 한복판인데도 40분 만에 도착하셔서 대형 고압 세척기 차 대놓고 시원하게 뚫어 주시더군요. 배관 카메라로 기름 유분 다 씻겨 내려가는거 눈으로 직접 확인시켜 주시니 믿음이 백 배 갔습니다.",
    date: "2026-05-31"
  },
  {
    id: "rev-3",
    customerName: "박*아",
    region: "경기 일산서구",
    rating: 5,
    serviceType: "변기 및 수전 교체",
    comment: "오래된 아파트라 수도꼭지에서 녹물 나오고 변기 물통도 삐 소리가 나며 새길래 걱정했는데 새 변기와 무독성 친환경 수전으로 엄청 깔끔하고 반짝이게 달아주셨어요. 마감 실리콘 바르실 때도 수평 정밀하게 맞춰서 예쁘게 타일 틈 메꿔주신 덕분에 욕실이 한결 환해졌네요. 대표 이기식 사장님이 친절하셔서 믿을 수 있습니다.",
    date: "2026-06-03"
  }
];
