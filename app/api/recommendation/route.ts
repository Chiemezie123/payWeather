
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { weatherType, chartData } = body;

  if (!chartData || !weatherType) {
    return NextResponse.json({ error: 'Missing weatherType or chartData' }, { status: 400 });
  }

  try {
    const prompt = `
You are a weather assistant. Based on the following weather data and activity type, generate a recommendation title and a short, friendly description (1-2 sentences) for a chart card.

Activity Type: ${weatherType}
Data (time series, partial): ${JSON.stringify(chartData.slice(0, 6))}

Respond in this format:
{
  "title": "...",
  "description": "..."
}
`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      }),
    });

    const result = await response.json();
    const content = result.choices?.[0]?.message?.content ?? '';

    const parsed = JSON.parse(content);
    return NextResponse.json(parsed);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
