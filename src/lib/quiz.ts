import Groq from 'groq-sdk';

export interface QuizAnswers {
  reusePasswords: 'yes' | 'no' | 'sometimes';
  usesPasswordManager: 'yes' | 'no' | 'heard_of';
  hasTwoFA: 'yes' | 'no' | 'unknown';
  usesVPNOnPublicWifi: 'yes' | 'sometimes' | 'no';
  checkedBreaches: 'yes' | 'no';
}

export interface QuizResult {
  biggestRisk: string;
  score: number;
  recommendedCategory: 'vpn' | 'password-manager' | 'antivirus' | '2fa-apps';
  reasoning: string;
  urgency: 'high' | 'medium' | 'low';
}

export const DEFAULT_QUIZ_RESULT: QuizResult = {
  biggestRisk: 'Using the same password across multiple sites is your biggest risk.',
  score: 2,
  recommendedCategory: 'password-manager',
  reasoning:
    'A password manager eliminates password reuse by generating unique passwords for every site.',
  urgency: 'high',
};

const VALID_CATEGORIES = ['vpn', 'password-manager', 'antivirus', '2fa-apps'] as const;
const VALID_URGENCIES = ['high', 'medium', 'low'] as const;

function isValidCategory(val: unknown): val is QuizResult['recommendedCategory'] {
  return VALID_CATEGORIES.includes(val as QuizResult['recommendedCategory']);
}

function isValidUrgency(val: unknown): val is QuizResult['urgency'] {
  return VALID_URGENCIES.includes(val as QuizResult['urgency']);
}

export function parseQuizResult(raw: string): QuizResult {
  try {
    const parsed = JSON.parse(raw) as Record<string, unknown>;

    const score =
      typeof parsed.score === 'number'
        ? Math.min(5, Math.max(1, Math.round(parsed.score)))
        : DEFAULT_QUIZ_RESULT.score;

    return {
      biggestRisk:
        typeof parsed.biggestRisk === 'string'
          ? parsed.biggestRisk
          : DEFAULT_QUIZ_RESULT.biggestRisk,
      score,
      recommendedCategory: isValidCategory(parsed.recommendedCategory)
        ? parsed.recommendedCategory
        : DEFAULT_QUIZ_RESULT.recommendedCategory,
      reasoning:
        typeof parsed.reasoning === 'string'
          ? parsed.reasoning
          : DEFAULT_QUIZ_RESULT.reasoning,
      urgency: isValidUrgency(parsed.urgency)
        ? parsed.urgency
        : DEFAULT_QUIZ_RESULT.urgency,
    };
  } catch {
    return DEFAULT_QUIZ_RESULT;
  }
}

export async function analyzeQuizAnswers(answers: QuizAnswers): Promise<QuizResult> {
  try {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const systemPrompt = `You are a cybersecurity advisor giving personalised recommendations. Always respond with valid JSON only. No markdown, no explanation, just the JSON object.`;

    const userPrompt = `A user answered these security questions:
- Reuses passwords across sites: ${answers.reusePasswords}
- Uses a password manager: ${answers.usesPasswordManager}
- Email has 2FA enabled: ${answers.hasTwoFA}
- Uses VPN on public WiFi: ${answers.usesVPNOnPublicWifi}
- Has checked for data breaches: ${answers.checkedBreaches}

Return this exact JSON structure:
{
  "biggestRisk": "one sentence describing their single biggest security vulnerability",
  "score": <integer 1-5 where 1 is least secure>,
  "recommendedCategory": <one of: "vpn", "password-manager", "antivirus", "2fa-apps">,
  "reasoning": "one sentence explaining why this category helps them most right now",
  "urgency": <one of: "high", "medium", "low">
}`;

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      response_format: { type: 'json_object' },
      max_tokens: 300,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) return DEFAULT_QUIZ_RESULT;

    return parseQuizResult(content);
  } catch {
    return DEFAULT_QUIZ_RESULT;
  }
}
