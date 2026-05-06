import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, context } = body;

    if (!process.env.GEMINI_API_KEY) {
      return Response.json({ error: 'GEMINI_API_KEY not configured', fallback: true }, { status: 200 });
    }

    let prompt = '';

    switch (action) {
      case 'schedule_task': {
        prompt = `You are AEON, an AI learning assistant. The user wants to add a custom task to their 12-week learning roadmap.

User's request: "${context.userInput}"

Current context:
- Current week: ${context.currentWeek}/12
- Current day: ${context.currentDay}/6
- Categories available: ai_ml, backend, dsa, build, college
- Energy level: ${context.energyLevel || 'medium'}
- Tasks already scheduled today: ${context.todayTaskCount || 0}
- Total tasks completed so far: ${context.totalCompleted || 0}

Generate a JSON response (and ONLY JSON, no markdown fences) with the following structure:
{
  "task": {
    "title": "concise task title",
    "description": "brief description of what to do",
    "xp": 15-50 (based on difficulty/time),
    "time_min": estimated minutes (5-120),
    "difficulty": "easy" | "medium" | "hard",
    "category": "ai_ml" | "backend" | "dsa" | "build" | "college"
  },
  "suggested_week": week number 1-12,
  "suggested_day": day number 1-6,
  "reason": "why this scheduling makes sense (1 sentence)"
}`;
        break;
      }

      case 'daily_advice': {
        prompt = `You are AEON, a motivational AI learning coach. Give brief, ADHD-friendly advice for today.

Context:
- Week ${context.currentWeek}/12, Day ${context.currentDay}
- Tasks completed today: ${context.todayCompleted}/${context.todayTotal}
- Current streak: ${context.streakCount} days
- Energy: ${context.energyLevel}
- Total XP: ${context.xp}

Respond with JSON only (no markdown fences):
{
  "message": "motivational message under 20 words",
  "tip": "practical study tip under 25 words",
  "suggested_break": true/false (if they seem overwhelmed)
}`;
        break;
      }

      case 'optimize_plan': {
        prompt = `You are AEON, an AI scheduler. The user has tasks for today. Reorder them for optimal learning flow based on cognitive science.

Tasks today:
${JSON.stringify(context.tasks, null, 2)}

Energy level: ${context.energyLevel}
Time available: ${context.timeAvailable} minutes

Respond with JSON only (no markdown fences):
{
  "ordered_task_ids": ["id1", "id2", ...],
  "reasoning": "brief explanation of ordering",
  "focus_suggestion": "which task to start with and why (1 sentence)"
}`;
        break;
      }

      default:
        return Response.json({ error: 'Unknown action' }, { status: 400 });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
      config: {
        temperature: 0.7,
        maxOutputTokens: 500,
      },
    });

    const text = response.text || '';
    
    // Try to parse as JSON
    try {
      const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const parsed = JSON.parse(cleaned);
      return Response.json({ success: true, data: parsed });
    } catch {
      return Response.json({ success: true, data: { raw: text } });
    }
  } catch (error: any) {
    console.error('Gemini API error:', error);
    return Response.json(
      { error: error.message || 'AI request failed', fallback: true },
      { status: 200 }
    );
  }
}
