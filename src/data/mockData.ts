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
    title: '全量零售采销AI陪练',
    description: '这是一段关于新人应知应会计划的长文本...',
    chapters: 10,
    estimatedHours: 3,
    status: 'in_progress',
    bannerTitle: '全量采销\nAI陪练',
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
  { id: '1', title: '新人零售采销知识培训课', type: 'learning', duration: '36:00min', status: 'not_started' },
  { id: '2', title: '新人零售采销知识培训课', type: 'learning', duration: '36:00min', status: 'in_progress' },
  { id: '3', title: '新人零售采销知识培训课', type: 'learning', duration: '36:00min', status: 'completed' },
  { id: '4', title: '多场景零售采销话术AI陪练', type: 'practice', duration: '36:00min', status: 'not_started', practiceMode: 'voice' },
  { id: '5', title: '多场景零售采销话术AI陪练', type: 'practice', duration: '36:00min', status: 'in_progress', practiceMode: 'text' },
  { id: '6', title: '多场景零售采销话术AI陪练', type: 'practice', duration: '36:00min', status: 'completed', practiceMode: 'voice' },
  { id: '7', title: '场景零售采销话术AI考试', type: 'exam', duration: '36:00min', status: 'locked' },
  { id: '8', title: '场景零售采销话术AI考试', type: 'exam', duration: '36:00min', status: 'in_progress' },
  { id: '9', title: '场景零售采销话术AI考试', type: 'exam', duration: '36:00min', status: 'completed' },
];

export const historyRecords: HistoryRecord[] = [
  { id: '1', title: '新人零售采销知识培训课', type: 'exam', duration: '36:00min', date: '2025-09-11 12:00', score: 82.7, planName: '新人应知应会', mode: 'free' },
  { id: '2', title: '多场景零售采销话术AI陪练', type: 'exam', duration: '36:00min', date: '2025-09-11 12:00', score: 78.5, planName: '新人应知应会', mode: 'scripted', acts: [
    { actNumber: 1, title: '初次接触与需求挖掘', scene: '你是一名采销专员，客户张经理是某连锁超市的采购负责人，首次拜访需要了解其核心需求。', score: 85.2, evaluation: '在需求挖掘阶段表现较好，能够通过开放性问题引导客户表达需求，但在追问细节时不够深入。', suggestion: '建议使用SPIN提问法，先了解客户现状，再挖掘痛点，最后引导需求。' },
    { actNumber: 2, title: '方案呈现与异议处理', scene: '基于第一幕了解的需求，向张经理呈现解决方案，并处理其对价格和服务的疑虑。', score: 72.8, evaluation: '方案呈现逻辑清晰，但在面对价格异议时应对不够灵活，过早进入价格谈判环节。', suggestion: '面对价格异议时，应先强调价值差异化，用数据和案例证明ROI，避免直接降价。' },
    { actNumber: 3, title: '促成成交与关系维护', scene: '张经理对方案基本认可，需要推动签约并建立长期合作关系。', score: 77.5, evaluation: '成交推动节奏较好，但在关系维护方面缺少具体的后续跟进计划。', suggestion: '签约后应主动提出30天回访计划和季度复盘机制，增强客户信任感。' },
  ]},
  { id: '3', title: '新人零售采销知识培训课', type: 'exam', duration: '36:00min', date: '2025-09-11 12:00', score: 91.2, planName: '全量零售采销AI陪练', mode: 'free' },
  { id: '4', title: '客户谈判实战演练', type: 'practice', duration: '36:00min', date: '2025-09-11 12:00', score: 85.0, planName: '全量零售采销AI陪练', mode: 'scripted', acts: [
    { actNumber: 1, title: '破冰与信息收集', scene: '首次电话联系潜在客户李总，了解其公司的采购流程和当前供应商情况。', score: 88.0, evaluation: '破冰环节表现自然，能够快速建立信任感，信息收集全面。', suggestion: '可以在收集信息时适当做笔记确认，让客户感受到被重视。' },
    { actNumber: 2, title: '竞品分析与差异化', scene: '客户提到目前已有合作供应商，需要展示我方产品的差异化优势。', score: 82.0, evaluation: '竞品分析到位，但差异化表达不够有冲击力，数据支撑不足。', suggestion: '准备3个以上的成功案例和具体数据，用对比表格直观展示差异。' },
  ]},
  { id: '5', title: '新人零售采销知识培训课', type: 'practice', duration: '36:00min', date: '2025-09-11 12:00', score: 88.3, planName: '新人应知应会', mode: 'free' },
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

import { ConversationSegment, ActConversation } from '@/types';

/** Free conversation: segmented into evaluation units of 2-3 rounds */
export const freeConversationSegments: ConversationSegment[] = [
  {
    messages: [
      { role: 'AI', content: '您好，我是来自XX公司的采销专员小王。请问您最近有考虑过扩大供货渠道吗？' },
      { role: 'user', content: '我们公司目前用的系统还行吧，暂时没有换的打算。' },
      { role: 'AI', content: '理解您的想法。不过我想了解一下，您目前的系统在处理大批量数据时，响应速度怎么样？' },
      { role: 'user', content: '这个我不太清楚，反正我们用着没什么问题。' },
    ],
    feedback: { type: 'error', issue: '前两轮回应过于消极且缺乏专业态度，未能有效建立对话基础。直接回避了对方的深入提问，错失了展示专业知识的机会。', suggestion: '建议在第一轮用开放性问题回应，如"您说的还行是指哪些方面？"；第二轮即使不了解细节也应展现主动性："这个我需要确认一下，不过我可以安排技术同事详细测试并提供报告给您。"' },
  },
  {
    messages: [
      { role: 'AI', content: '好的，那您方便告诉我，贵公司目前团队规模大概有多少人在使用这个系统呢？' },
      { role: 'user', content: '大概有50多人吧，但这个跟你们的产品有什么关系呢？' },
      { role: 'AI', content: '非常感谢您的信息。50人规模的团队，如果能提升10%的工作效率，一年能节省不少成本呢。' },
      { role: 'user', content: '你们的产品价格是多少？我先看看再说。' },
    ],
    feedback: { type: 'improvement', issue: '能够提供基本信息并提出合理反问，但在价值讨论阶段过早转向价格，显得急躁。', suggestion: '建议先了解更多价值信息："在讨论价格之前，我想先了解一下贵公司具体的需求点，这样才能给您推荐最合适的方案。"' },
  },
];

/** Scripted conversation: segmented within each act */
export const scriptedConversationSegments: ActConversation[] = [
  {
    actNumber: 1,
    title: '初次接触与需求挖掘',
    segments: [
      {
        messages: [
          { role: 'AI', content: '张经理您好，我是XX公司的采销顾问小李。感谢您百忙之中抽出时间，今天主要想了解一下贵公司在供应链方面的情况。' },
          { role: 'user', content: '你好，你们公司我听说过，不过我们目前合作的供应商还比较稳定。' },
          { role: 'AI', content: '理解，稳定的合作关系确实很重要。不过我想请教一下，贵公司目前在采购成本控制方面有没有遇到什么挑战？' },
          { role: 'user', content: '成本方面确实一直在想办法优化，特别是物流成本这一块上涨比较多。' },
        ],
        feedback: { type: 'improvement', issue: '第一轮回应过早表达拒绝倾向，但第二轮能够开放地分享实际痛点，整体表现中规中矩。', suggestion: '建议第一轮更开放地回应："你好，欢迎。我们确实有一些合作伙伴了，不过也一直在关注行业内的新方案，你们有什么特别的优势吗？"' },
      },
    ],
  },
  {
    actNumber: 2,
    title: '方案呈现与异议处理',
    segments: [
      {
        messages: [
          { role: 'AI', content: '根据您刚才提到的物流成本问题，我们的集中仓储配送方案可以帮助降低15%-20%的物流成本。我给您看一下详细方案。' },
          { role: 'user', content: '降15%到20%？这个数字是怎么算出来的？我觉得有点夸张了。' },
        ],
        feedback: { type: 'good' },
      },
      {
        messages: [
          { role: 'AI', content: '这个数据来自我们和同行业三家企业的实际合作结果。我可以提供详细的对比报告供您参考。' },
          { role: 'user', content: '报告可以看看，但你们的服务费用是不是也很高？算上服务费还能省这么多吗？' },
        ],
        feedback: { type: 'error', issue: '直接质疑价格，陷入了价格导向的谈判陷阱，未能先聚焦整体价值。', suggestion: '应先聚焦价值："服务费用是一方面，但我更想了解一下整体的ROI情况，如果综合算下来确实能提升效率和降低成本，那费用结构我们可以详细讨论。"' },
      },
    ],
  },
  {
    actNumber: 3,
    title: '促成成交与关系维护',
    segments: [
      {
        messages: [
          { role: 'AI', content: '综合来看，以贵公司目前的采购规模，我们的方案每年可以为您节省约50万元。您觉得我们是否可以安排一次试点合作？' },
          { role: 'user', content: '50万确实有吸引力，那你们的合同期限是怎么设定的？' },
          { role: 'AI', content: '我们通常建议先从3个月的试点期开始，让您零风险体验效果。试点期结束后，我们可以根据实际数据来决定后续合作方式。' },
          { role: 'user', content: '可以的，那你把合同和详细方案发给我，我这边走一下内部审批流程。' },
        ],
        feedback: { type: 'improvement', issue: '成交意愿表达不错，但缺少后续跟进的主动安排，显得被动。', suggestion: '应主动把握节奏："好的，我今天下午就把合同和方案发您。另外我建议我们下周三做一次正式的kick-off会议，我也可以提前和您的团队做个对接，确保推进顺畅。"' },
      },
    ],
  },
];

export const conversationRecords = [
  { role: 'AI' as const, content: '这个需要找你们商量一下：提供数正云的sdk需要更新rtc的id和合格域名，跟京办创讨论是否可以通过训' },
  { role: 'user' as const, content: '设计思维与用户洞察：重点考察其解决问题的思路是否以用户为中心。是否能清晰阐述设计决策背后的用户研究与数据支撑，而非主观偏好，这体现了专业深度。' },
];
