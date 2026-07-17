import { createClient } from 'redis';
import { NextResponse } from 'next/server';

export async function GET() {
  const client = createClient({ url: process.env.REDIS_URL });
  await client.connect();

  const keys = await client.keys('reminder:*');
  const now = new Date();
  let firedCount = 0;

  for (const key of keys) {
    const raw = await client.get(key);
    if (!raw) continue;
    const reminder = JSON.parse(raw);

    if (reminder.sent) continue;

    if (new Date(reminder.fireAt) <= now) {
      await fetch(`https://ntfy.sh/${reminder.ntfyTopic}`, {
        method: 'POST',
        body: `Reminder: ${reminder.task}`,
      });
      await client.set(key, JSON.stringify({ ...reminder, sent: true }));
      firedCount++;
    }
  }

  await client.quit();
    return NextResponse.json({ checked: keys.length, fired: firedCount });
}