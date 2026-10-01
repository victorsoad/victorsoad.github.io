import { getCollection } from 'astro:content';

export async function postsPublicados() {
  const todos = await getCollection('posts', ({ data }) => !data.rascunho);
  return todos.sort((a, b) => b.data.data.valueOf() - a.data.data.valueOf());
}
