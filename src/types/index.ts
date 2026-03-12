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
  aiMatchScore?: number;
  progress?: number;
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
  practiceMode?: 'voice' | 'text';
  aiDifficulty?: number;
}

export type PracticeMode = 'free' | 'scripted';

export interface ActResult {
  actNumber: number;
  title: string;
  scene: string;
  score: number;
  evaluation: string;
  suggestion: string;
}

export interface HistoryRecord {
  id: string;
  title: string;
  type: ItemType;
  duration: string;
  date: string;
  score?: number;
  planName?: string;
  mode: PracticeMode;
  acts?: ActResult[];
}

export interface AbilityScore {
  name: string;
  score: number;
  maxScore: number;
}

export type FeedbackType = 'error' | 'improvement' | 'good' | null;

export interface SegmentFeedback {
  type: FeedbackType;
  issue?: string;
  suggestion?: string;
}

export interface ConversationMessage {
  role: 'AI' | 'user';
  content: string;
}

/** A segment groups 2-3 rounds of dialogue as one evaluation unit */
export interface ConversationSegment {
  messages: ConversationMessage[];
  feedback?: SegmentFeedback;
}

export interface ActConversation {
  actNumber: number;
  title: string;
  segments: ConversationSegment[];
}

// Keep legacy aliases for backward compat
export type ConversationFeedback = SegmentFeedback;

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
