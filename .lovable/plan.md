

## Plan: Merge AI Coaching into User Message Bubble

**Goal:** Move the "AI 点评" toggle button and the coaching feedback content inside the user's message bubble, so everything appears as one unified bubble rather than separate elements.

### Current Structure
```
[User bubble]          ← blue bubble with text
  [AI 点评 button]     ← separate element below bubble
[Coaching card]        ← separate card below everything
```

### Target Structure
```
[User bubble]          ← single blue bubble containing:
  - User text
  - "AI 点评" divider/button (inside bubble)
  - Coaching content (expands inside bubble)
```

### Changes (single file: `PracticeTextChat.tsx`)

**Lines 308-336** — Merge the coaching button and expanded content into the user message bubble:

1. Move the "AI 点评" toggle button inside the `rounded-2xl px-4 py-3` user bubble div, below the message text
2. When expanded, render the coaching guidance and polished text also inside the same bubble div
3. Use a subtle divider line between message text and coaching area
4. Adjust text colors for readability against the blue/primary background (use `text-primary-foreground/70` for secondary text)
5. Remove the separate coaching card block (lines 339-359) entirely

**Visual result:**
```
┌──────────────────────┐
│ 用户发送的消息文本     │
│                      │
│ ── AI 点评 ▼ ────── │  ← tap to expand
│                      │
│ 指导建议：xxx         │  ← only when expanded
│ 润色表达：xxx         │
└──────────────────────┘
```

The coaching content uses lighter/translucent text colors within the primary-colored bubble to maintain visual hierarchy while keeping everything in one cohesive unit.

