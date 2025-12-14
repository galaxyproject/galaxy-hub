import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const platforms = await getCollection('platforms');

  const feedItems = platforms.map(platform => {
    return {
      title: platform.data.title || 'Untitled',
      slug: platform.data.slug,
      url: `/use/${platform.data.slug}/`,
      scope: platform.data.scope || null,
      summary: platform.data.summary || platform.data.tease || '',
      platforms: platform.data.platforms || [],
    };
  });

  return new Response(JSON.stringify({ platforms: feedItems }, null, 2), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
