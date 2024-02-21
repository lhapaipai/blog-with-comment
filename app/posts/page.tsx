import distanceToNow from "@/lib/date";
import { getAllPosts } from "@/lib/post";
import Link from "next/link";

export default function Page() {
  const posts = getAllPosts(["slug", "title", "excerpt", "date"]);
  return (
    <>
      {posts.map((post) => (
        <article key={post.slug} className="mb-10">
          <Link
            href={`/posts/${post.slug}`}
            className="text-lg font-bold leading-6 hover:text-gray-900"
          >
            {post.title}
          </Link>
          <p>{post.excerpt}</p>
          <div className="text-gray-400">
            {post.date && <time>{distanceToNow(post.date)}</time>}
          </div>
        </article>
      ))}
    </>
  );
}
