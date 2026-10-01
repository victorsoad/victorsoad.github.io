import rss from '@astrojs/rss';
import { postsPublicados } from '../posts';
import { SITE } from '../site';

export async function GET(context) {
  const posts = await postsPublicados();
  return rss({
    title: SITE.titulo,
    description: SITE.descricao,
    site: context.site,
    items: posts.map((p) => ({
      title: p.data.titulo,
      description: p.data.resumo,
      pubDate: p.data.data,
      link: `/posts/${p.id}/`,
    })),
    customData: '<language>pt-br</language>',
  });
}
