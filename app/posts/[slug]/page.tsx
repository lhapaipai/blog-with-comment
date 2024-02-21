import distanceToNow from "@/lib/date";
import markdown2html from "@/lib/markdown";
import { getAllPosts, getPostBySlug } from "@/lib/post";
import { notFound } from "next/navigation";
import Comments from "./comment/index";

export async function generateMetadata({ params }: Props) {
  return {
    title: `Post ${params.slug}`,
  };
}

async function getParsedPost(slug: string) {
  const post = getPostBySlug(slug, [
    "slug",
    "title",
    "excerpt",
    "date",
    "content",
  ]);

  if (!post) {
    notFound();
  }

  const content = await markdown2html(post.content || "");

  return {
    ...post,
    content,
  };
}

interface Props {
  params: {
    slug: string;
  };
}

export default async function Page({ params }: Props) {
  const post = await getParsedPost(params.slug);

  return (
    <article>
      <header>
        <h1 className="text-4xl font-bold">{post.title}</h1>
        {post.excerpt && <p className="mt-2 text-xl">{post.excerpt}</p>}
        {post.date && (
          <time className="mt-2 flex text-gray-400">
            {distanceToNow(post.date)}
          </time>
        )}
      </header>
      <div
        className="prose mt-10"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <Comments />
    </article>
  );
}

export function generateStaticParams() {
  const posts = getAllPosts(["slug"]);

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
