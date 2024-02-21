import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { Post } from "@/app";

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs() {
  return readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  if (!existsSync(fullPath)) {
    return null;
  }
  const fileContents = readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const items: Post = {};

  fields.forEach((field) => {
    switch (field) {
      case "slug":
        items.slug = realSlug;
        return;
      case "content":
        items.content = content;
        return;
      case "date":
        items.date = new Date(data.date);
      default:
        if (typeof data[field] !== "undefined") {
          items[field] = data[field];
        }
    }
  });

  return items;
}

export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    .sort((post1, post2) => {
      if (!post1.date || !post2.date) {
        return 1;
      }
      return post1.date > post2.date ? -1 : 1;
    });

  return posts;
}
