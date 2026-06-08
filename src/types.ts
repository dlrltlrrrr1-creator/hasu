export interface ServiceItem {
  id: string;
  title: string;
  category: "work" | "installation";
  description: string;
  badges: string[];
  specs: string[];
  imageUrl: string;
}

export interface EstimateRequest {
  id: string;
  customerName: string;
  phone: string;
  region: string;
  subRegion: string;
  serviceType: string;
  customDescription: string;
  createdAt: string;
  status: "pending" | "confirmed" | "completed";
}

export interface ReviewItem {
  id: string;
  customerName: string;
  region: string;
  rating: number;
  serviceType: string;
  comment: string;
  beforeImg?: string;
  afterImg?: string;
  date: string;
}

export interface QnAItem {
  id: string;
  author: string;
  question: string;
  answer?: string;
  date: string;
  isLocked: boolean;
}
