import { Comment } from "@/app-types";
import redis from "@/lib/redis";
import { clearUrl } from "@/lib/url";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const headersList = headers();
  const url = clearUrl(headersList.get("referer") || "http://unknown");

  if (!redis) {
    return new Response("Unable to connect to Redis", { status: 401 });
  }

  try {
    const rawComments = await redis.lrange(url, 0, -1);

    const comments = rawComments.map((c) => {
      const comment: Comment = JSON.parse(c);
      if (comment.user) {
        delete comment.user.email;
      }
      return comment;
    });

    return NextResponse.json(comments);
  } catch (_) {
    return new Response("Unexpected error when reading Redis data", {
      status: 400,
    });
  }
}

export function POST(request: Request) {}

export function DELETE(request: Request) {}
