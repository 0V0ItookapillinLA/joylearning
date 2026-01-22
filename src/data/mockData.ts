import { Plan, Chapter, LearningItem, HistoryRecord, AbilityScore, UserProfile } from '@/types';

export const plans: Plan[] = [
  {
    id: '1',
    title: '新人应知应会计划',
    description: '这是一段关于新人应知应会计划的长文本...',
    chapters: 12,
    estimatedHours: 4,
    status: 'not_started',
    bannerTitle: '新人\n应知应会',
  },
  {
    id: '2',
    title: '全量销售AI陪练',
    description: '这是一段关于新人应知应会计划的长文本...',
    chapters: 10,
    estimatedHours: 3,
    status: 'in_progress',
    bannerTitle: '全量销售\nAI陪练',
  },
];

export const chapters: Chapter[] = [
  { id: '1', number: 1, title: '章节1', status: 'completed' },
  { id: '2', number: 2, title: '章节2', status: 'completed' },
  { id: '3', number: 3, title: '章节3', status: 'in_progress' },
  { id: '4', number: 4, title: '章节4', status: 'locked' },
  { id: '5', number: 5, title: '章节5', status: 'locked' },
];

export const learningItems: LearningItem[] = [
  { id: '1', title: '新人销售知识培训课', type: 'learning', duration: '36:00min', status: 'not_started' },
  { id: '2', title: '新人销售知识培训课', type: 'learning', duration: '36:00min', status: 'in_progress' },
  { id: '3', title: '新人销售知识培训课', type: 'learning', duration: '36:00min', status: 'completed' },
  { id: '4', title: '多场景销售话术AI陪练', type: 'practice', duration: '36:00min', status: 'not_started' },
  { id: '5', title: '多场景销售话术AI陪练', type: 'practice', duration: '36:00min', status: 'in_progress' },
  { id: '6', title: '多场景销售话术AI陪练', type: 'practice', duration: '36:00min', status: 'completed' },
  { id: '7', title: '场景销售话术AI考试', type: 'exam', duration: '36:00min', status: 'locked' },
  { id: '8', title: '场景销售话术AI考试', type: 'exam', duration: '36:00min', status: 'in_progress' },
  { id: '9', title: '场景销售话术AI考试', type: 'exam', duration: '36:00min', status: 'completed' },
];

export const historyRecords: HistoryRecord[] = [
  { id: '1', title: '新人销售知识培训课', type: 'exam', duration: '36:00min', date: '2025-09-11 12:00', score: 82.7 },
  { id: '2', title: '新人销售知识培训课', type: 'exam', duration: '36:00min', date: '2025-09-11 12:00', score: 78.5 },
  { id: '3', title: '新人销售知识培训课', type: 'exam', duration: '36:00min', date: '2025-09-11 12:00', score: 91.2 },
  { id: '4', title: '新人销售知识培训课', type: 'practice', duration: '36:00min', date: '2025-09-11 12:00', score: 85.0 },
  { id: '5', title: '新人销售知识培训课', type: 'practice', duration: '36:00min', date: '2025-09-11 12:00', score: 88.3 },
];

export const abilityScores: AbilityScore[] = [
  { name: '候选人挖掘', score: 90, maxScore: 100 },
  { name: '抗压能力', score: 76, maxScore: 100 },
  { name: '责任心', score: 50, maxScore: 100 },
  { name: '高招经验', score: 40, maxScore: 100 },
  { name: '团队合作', score: 90, maxScore: 100 },
  { name: '数据分析', score: 90, maxScore: 100 },
  { name: '业务理解', score: 90, maxScore: 100 },
  { name: '沟通能力', score: 90, maxScore: 100 },
];

export const userProfile: UserProfile = {
  name: '张清',
  account: 'zhangqing1',
  avatar: '',
  studyHours: 100,
  overallScore: 82.7,
};

export const evaluationText = `1、设计思维与用户洞察：重点考察其解决问题的思路是否以用户为中心。是否能清晰阐述设计决策背后的用户研究与数据支撑，而非主观偏好，这体现了专业深度。

2、协作与沟通能力：评估其如何与产品、开发等角色合作。关注其如何阐述设计、接受反馈及推动落地，这能反映其团队融合度与项目推动力。

3、项目ownership与成长潜力：不仅看执行，更关注其是否主动挖掘问题、承担责任并总结复盘。对行业趋势的思考能体现其自驱力与长期潜力。`;

export const strengthsData = [
  {
    title: '数据分析',
    content: '设计思维与用户洞察：重点考察其解决问题的思路是否以用户为中心。是否能清晰阐述设计决策背后的用户研究与数据支撑，而非主观偏好，这体现了专业深度。'
  },
  {
    title: '沟通能力',
    content: '设计思维与用户洞察：重点考察其解决问题的思路是否以用户为中心。是否能清晰阐述设计决策背后的用户研究与数据支撑，而非主观偏好，这体现了专业深度。'
  },
  {
    title: '候选人挖掘',
    content: '设计思维与用户洞察：重点考察其解决问题的思路是否以用户为中心。是否能清晰阐述设计决策背后的用户研究与数据支撑，而非主观偏好，这体现了专业深度。'
  },
];

export const weaknessesData = [
  {
    title: '抗压能力',
    content: '设计思维与用户洞察：重点考察其解决问题的思路是否以用户为中心。是否能清晰阐述设计决策背后的用户研究与数据支撑，而非主观偏好，这体现了专业深度。'
  },
  {
    title: '沟通能力',
    content: '设计思维与用户洞察：重点考察其解决问题的思路是否以用户为中心。是否能清晰阐述设计决策背后的用户研究与数据支撑，而非主观偏好，这体现了专业深度。'
  },
  {
    title: '候选人挖掘',
    content: '设计思维与用户洞察：重点考察其解决问题的思路是否以用户为中心。是否能清晰阐述设计决策背后的用户研究与数据支撑，而非主观偏好，这体现了专业深度。'
  },
];

export const conversationRecords = [
  { role: 'AI' as const, content: '这个需要找你们商量一下：提供数正云的sdk需要更新rtc的id和合格域名，跟京办创讨论是否可以通过训' },
  { role: 'user' as const, content: '设计思维与用户洞察：重点考察其解决问题的思路是否以用户为中心。是否能清晰阐述设计决策背后的用户研究与数据支撑，而非主观偏好，这体现了专业深度。' },
];
