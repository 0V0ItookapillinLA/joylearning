

## AI-Native Product Enhancement Plan

Based on the reference material and your current product (a retail procurement training app), here's a prioritized plan of features that fit your domain and would meaningfully elevate the AI experience.

---

### Phase 1: Home Page — AI Daily Training Card (首页 AI 今日训练卡)

**Current state:** Home is a TikTok-style content feed.

**Enhancement:** Add an **AI Daily Training Plan card** at the top of the feed (or as the first "slide") that shows:
- Today's personalized micro-plan: e.g. "5min 跟读话术 + 8min 场景对练 + 2min 即兴应答"
- A one-line AI explanation: "Based on your weak point in objection handling..."
- Progress ring showing daily completion
- "Start Training" one-tap button

This replaces passive browsing with an active, AI-curated daily agenda.

---

### Phase 2: Practice Room — Real-time Multi-dimensional Coaching (练习中实时多维教练)

**Current state:** Voice practice has basic speech recognition + mock replies. Text practice has static coaching cards.

**Enhancements for both voice and text modes:**

1. **Floating real-time tips bar** — During practice, show lightweight floating notifications for:
   - Speech pace ("稍微放慢一点")
   - Filler words count ("赘词有点多: 嗯×3")
   - Key info coverage progress (e.g. STAR checklist for structured scenarios)

2. **"I'm Stuck" button (卡住了/给我示范)** — Already partially exists as "hint". Upgrade to:
   - AI generates 2-3 example responses at different difficulty levels (基础版 / 进阶版)
   - User can tap to see and optionally use as reference

3. **Scene progress bar** — Add a horizontal progress indicator showing how far the user is in the current act, so they know when the scene will end.

---

### Phase 3: AI Deep Diagnosis Report (AI 深度诊断报告)

**Current state:** PracticeComplete shows a score + links to a history detail page with act-by-act evaluation.

**Enhancement — Redesign the completion/report flow:**

1. **Top: Score + one-sentence AI summary** (already exists, keep it)

2. **Middle: Dimension cards** — Replace the current flat act list with expandable dimension cards:
   - Dimensions: 需求澄清, 方案匹配, 异议处理, 推进结果, 沟通表达
   - Each card: score, one-line explanation, "Practice this now" quick-action button

3. **Bottom: "Error notebook" (错题本)** — List 3-10 key sentences from the practice:
   - Original user phrasing vs AI-polished version (基础版 / 高级版)
   - For voice mode: add replay button for A/B comparison

4. **AI-generated next step** — At the bottom of the report, show an auto-generated micro-plan:
   - "10 minutes focused on objection handling" or "3 new scenarios for STAR practice"
   - One-tap "Start training" button (no need to navigate back to course list)

---

### Phase 4: AI Coach Persona & Dynamic Scenarios (AI 教练人设 + 动态场景)

**Current state:** Fixed mock scenes and responses.

**Enhancements:**

1. **Coach style selector** — Let users choose coaching personality before practice:
   - 温柔鼓励型 (Encouraging)
   - 严谨打磨型 (Rigorous)
   - 毒舌吐槽型 (Tough love)
   - This is passed as part of the system prompt to the AI

2. **Dynamic scenario generation** — Instead of fixed 3-act scripts, use AI to generate scenarios based on:
   - User's weak dimensions
   - Selected industry context (白酒经销, 冷链物流, etc.)
   - Difficulty level

---

### Phase 5: Weekly AI Coach Report (AI 周报)

**Current state:** Profile page has a radar chart and trend chart with static data.

**Enhancement:** Add an "AI Weekly Summary" section in the Profile page:
- Natural language "coach letter" summarizing the week
- Key metrics: practice time, dimension trends, streak days
- Highlight: "This week you improved most in 异议处理 (+12 points)"
- Weak spot: "Still struggling with 方案匹配, here's a targeted exercise"

---

### Phase 6: Pre-event Warm-up Mode (关键场景热身模式)

Add an entry point (from Home or Profile) where users can input:
- "I have a supplier negotiation with XX company tomorrow"
- AI generates a custom practice scenario tailored to that context
- Provides tactical suggestions and a quick practice session

---

### Implementation Priority & Approach

| Priority | Feature | Complexity | Files Affected |
|----------|---------|------------|----------------|
| P0 | AI Daily Training Card on Home | Medium | `Home.tsx`, new component |
| P0 | "I'm Stuck" + example answers in practice | Low | `PracticePage.tsx`, `PracticeTextChat.tsx` |
| P1 | Floating real-time tips (pace, filler words) | Medium | `PracticePage.tsx`, speech hook |
| P1 | Deep Diagnosis Report redesign | Medium | `PracticeComplete.tsx`, `HistoryDetail.tsx` |
| P1 | Error notebook with AI rewrites | Medium | New component, `HistoryDetail.tsx` |
| P2 | Coach persona selector | Low | `PracticeDetail.tsx`, AI prompt |
| P2 | Scene progress bar | Low | `PracticePage.tsx`, `PracticeTextChat.tsx` |
| P2 | AI-generated next-step micro-plan | Medium | `PracticeComplete.tsx` |
| P3 | Weekly AI Coach Report | Medium | `Profile.tsx`, new component |
| P3 | Pre-event warm-up mode | High | New page + AI integration |
| P3 | Dynamic scenario generation | High | Edge function + AI integration |

**Technical note:** Features marked P2+ that involve real AI responses would use Lovable AI (edge functions calling the AI gateway) to replace the current mock response system. The coach persona and scenario generation would be controlled via system prompts in the edge function.

---

### What I recommend building first

Start with **Phase 1 (AI Daily Training Card)** and **Phase 2 (enhanced practice room with "I'm Stuck" and progress bar)** — these are high-impact, moderate-effort changes that immediately make the product feel more "AI-native" without requiring full backend AI integration.

Shall I proceed with implementing these?

