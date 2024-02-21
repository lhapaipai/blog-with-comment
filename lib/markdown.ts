import { remark } from "remark";
import remarkHtml from "remark-html";

export default async function markdown2html(markdown: string) {
  const result = await remark().use(remarkHtml).process(markdown);
  return result.toString();
}
