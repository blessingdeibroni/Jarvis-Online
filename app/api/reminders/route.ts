import { createClient } from 'redis';
import { NextResponse } from 'next/server';

async function getRedisClient() {
  const client = createClient({ url: process.env.REDIS_URL });
  await client.connect();
  return client;
}

export async function POST(request: Request) {
  const { task, fireAt, ntfyTopic } = await request.json();
  const client = await getRedisClient();

  const id = `reminder:${Date.now()}`;
  await client.set(id, JSON.stringify({ task, fireAt, ntfyTopic, sent: false }));
  await client.quit();

  return NextResponse.json({ success: true, id });
}