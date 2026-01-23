export type PlanStatus = 'not_started' | 'in_progress' | 'completed';
export type ItemType = 'learning' | 'practice' | 'exam';
export type ItemStatus = 'not_started' | 'in_progress' | 'completed' | 'locked';

export interface Plan {
  id: string;
  title: string;
  description: string;
  chapters: number;
  estimatedHours: number;
  status: PlanStatus;
  bannerTitle: string;
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  status: ItemStatus;
}

export interface LearningItem {
  id: string;
  title: string;
  type: ItemType;
  duration: string;
  status: ItemStatus;
}

export interface HistoryRecord {
  id: string;
  title: string;
  type: ItemType;
  duration: string;
  date: string;
  score?: number;
  planName?: string;
}

export interface AbilityScore {
  name: string;
  score: number;
  maxScore: number;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface UserProfile {
  name: string;
  account: string;
  avatar: string;
  studyHours: number;
  overallScore: number;
}
