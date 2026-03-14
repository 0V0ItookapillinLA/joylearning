

## Analysis: Borrowing from 心之易 to Enrich JoyLearning

After reviewing the 心之易 screenshots and your current codebase, here are the design patterns worth adopting, adapted for your retail procurement training context.

### What 心之易 does well (relevant to you)

1. **Content discovery is layered** — tabs separate AI characters from public practice records, creating two distinct browsing modes
2. **Public practice records** — users can see others' practice dialogues, creating community + learning-by-example
3. **Rich scenario cards** — each AI scenario has avatar, title, description, skill tags, and practice count (e.g. "22800+人次练过")
4. **Content sections with hierarchy** — "热门AI当事人", "大咖打磨", "视频" sections on the discovery page create visual rhythm

### Proposed Changes

#### 1. Restructure Course Center into "发现" (Discovery) page

Current `CourseCenter` only shows course grid cards. Transform it into a richer content hub:

```text
┌─────────────────────────┐
│  [AI练习场景]  [公开对练]  │  ← two tabs
├─────────────────────────┤
│                         │
│  AI练习场景 tab:         │
│  ┌─────────┬──────────┐ │
│  │ 场景卡片  │ 场景卡片  │ │  ← 2x2 grid with avatar,
│  │ avatar   │ avatar   │ │     title, skill tag,
│  │ title    │ title    │ │     practice count
│  │ #技能标签 │ #技能标签 │ │
│  │ 1200+练过│ 800+练过 │ │
│  ├─────────┼──────────┤ │
│  │ 场景卡片  │ 场景卡片  │ │
│  └─────────┴──────────┘ │
│                         │
│  公开对练 tab:           │
│  ┌─────────────────────┐│
│  │ 用户A 的分享          ││
│  │ 和 [avatar] 难缠客户  ││  ← card showing who
│  │ "价格谈判的关键突破"   ││     practiced with which
│  ├─────────────────────┤│     scenario + highlight
│  │ 用户B 的分享          ││
│  │ 和 [avatar] 供应商老张 ││
│  │ "第一次成功压价20%"   ││
│  └─────────────────────┘│
└─────────────────────────┘
```

**Files:** `CourseCenter.tsx` (restructure), new `ScenarioCard.tsx`, new `PublicPracticeCard.tsx`, update `mockData.ts`

#### 2. Keep existing course plans accessible via a "学习计划" section

Move current course grid (plans) into a collapsible section or secondary tab within the discovery page, so it doesn't get lost but isn't the primary view.

#### 3. Add scenario detail page

When tapping a scenario card, show a detail page (similar to 心之易's character detail):
- Scenario avatar + title + description
- Skill tags (e.g. #异议处理 #价格谈判)
- Practice count ("1200+人次练过")
- Tabs: "简介" | "公开对练" | "我的对练"
- Bottom CTA: "开始对练" button

**Files:** New `ScenarioDetail.tsx`, new route `/scenario/:id`

#### 4. Enrich mock data

Add 6-8 practice scenarios with:
- Unique avatars (use initials/emoji)
- Skill category tags
- Difficulty levels
- Practice counts
- Short descriptions

Add 5-6 public practice records with:
- Anonymous usernames
- Scenario reference
- One-line highlight quote
- Practice date

#### 5. Update TabBar label

Rename "课程中心" to "发现" to match the broader content scope.

### What stays unchanged
- Home page (video feed) — untouched
- AI practice room (PracticePage, PracticeTextChat) — untouched
- Chat page — untouched
- Profile / Growth — untouched

### Implementation order
| Step | Change | Effort |
|------|--------|--------|
| 1 | Add scenario mock data + public practice data | Low |
| 2 | Create ScenarioCard + PublicPracticeCard components | Medium |
| 3 | Restructure CourseCenter with tabs | Medium |
| 4 | Create ScenarioDetail page + route | Medium |
| 5 | Update TabBar label | Trivial |

