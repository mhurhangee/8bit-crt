import kv from '@vercel/kv';
import { openai } from '@ai-sdk/openai';
import { convertToCoreMessages, streamText } from 'ai';
import { Ratelimit } from '@upstash/ratelimit';
import { NextRequest } from 'next/server';

// Allow streaming responses up to 10 seconds
export const maxDuration = 10;

// Create per-user rate limit
const userRatelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(10, '1 m'),
  prefix: 'ratelimit:user',
});

// Create global rate limit
const globalRatelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(100, '1 m'),
  prefix: 'ratelimit:global',
});

export async function POST(req: NextRequest) {
  const ip = req.ip ?? 'ip';

  // Check user rate limit
  const userLimit = await userRatelimit.limit(ip);
  if (!userLimit.success) {
    return new Response('Rate limit exceeded. Please try again later.', { status: 429 });
  }

  // Check global rate limit
  const globalLimit = await globalRatelimit.limit('global');
  if (!globalLimit.success) {
    return new Response('Server is busy. Please try again later.', { status: 429 });
  }

  const { messages } = await req.json();

  const result = await streamText({
    model: openai('gpt-4o-mini'),
    system: 'You are a helpful assistant who is knowledgeable about 8-bit video games. Only answer questions relating to 8-bit video games. Keep your responses short: max 3 sentences. Try and be funny and witty.',
    messages: convertToCoreMessages(messages),
    temperature: 0.7,
    maxTokens: 512,
  });

  return result.toDataStreamResponse();
}