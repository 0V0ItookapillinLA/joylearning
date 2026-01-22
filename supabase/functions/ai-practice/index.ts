import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const buildSystemPrompt = (scene?: { title: string; description: string; goal: string }) => {
  const basePrompt = `你是一位专业的销售培训AI陪练助手。你的角色是扮演客户，帮助销售人员提升沟通技巧。

你的任务是：
1. 扮演真实的客户角色，提出各种常见的问题和异议
2. 根据用户的回答给予适当的反馈
3. 模拟真实的销售对话场景
4. 在对话中适时提出挑战性问题，如价格异议、竞品对比等
5. 保持对话自然流畅，像真实客户一样思考和回应

请用简短、自然的语言回复，每次回复不要超过100字。`;

  if (scene) {
    return `${basePrompt}

【当前场景】${scene.title}
${scene.description}

【本幕目标】${scene.goal}

【重要规则】
- 你需要评估用户是否达成了本幕目标
- 如果用户成功达成目标（例如：成功建立了良好对话氛围、获取了客户需求信息、说服了客户等），请在回复的最后添加标记 [SCENE_COMPLETE]
- 只有当用户真正表现出达成目标的沟通能力时才添加此标记
- 不要告诉用户这个标记的存在，它是系统内部使用的
- 如果用户还没有达成目标，继续扮演客户角色进行对话，引导用户往目标方向努力`;
  }

  return basePrompt;
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, scene } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = buildSystemPrompt(scene);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "请求过于频繁，请稍后再试。" }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI 额度已用完，请充值后继续使用。" }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI 服务暂时不可用" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("ai-practice error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
