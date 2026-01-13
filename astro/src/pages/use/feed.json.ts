/**
 * Platforms JSON Feed
 * Outputs all Galaxy platform/server data at /use/feed.json
 * Format matches original Gridsome feed for backward compatibility
 */
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const platforms = await getCollection('platforms');

  // Format as array (matching Gridsome output)
  const feedItems = platforms.map((platform) => {
    const data = platform.data;
    const slug = (data.slug || platform.id).replace(/\/$/, '');

    return {
      id: platform.id,
      url: data.url || null,
      path: `use/${slug}/index.md`,
      title: data.title || null,
      image: data.image || null,
      scope: data.scope || null,
      summary: data.summary || data.tease || null,
      comments: data.comments || [],
      user_support: data.user_support || [],
      quotas: data.quotas || [],
      citations: data.citations || [],
      pub_libraries: data.pub_libraries || [],
      sponsors: data.sponsors || [],
      platforms: data.platforms || [],
      link: `/use/${slug}`,
    };
  });

  return new Response(JSON.stringify(feedItems, null, 2), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
