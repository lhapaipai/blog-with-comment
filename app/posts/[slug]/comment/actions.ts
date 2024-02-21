"use server";

import redis from "@/lib/redis";
import { nanoid } from "nanoid";
import { clearUrl } from "@/lib/url";
import { headers } from "next/headers";
import { Comment } from "@/app-types";

export async function addComment(formData: FormData) {
  const headersList = headers();
  const url = clearUrl(headersList.get("referer") || "http://unknown");

  if (!redis) {
    return {
      message: "Unable to connect to Redis",
    };
  }
  const comment: Comment = {
    id: nanoid(),
    createdAt: Date.now(),
    url,
    text: (formData.get("text") as string) || "",
  };

  try {
    await redis.lpush(url, JSON.stringify(comment));

    return {
      message: "Commentaire ajouté !",
    };
  } catch (_) {
    return {
      message: "Échec de l'envoi",
    };
  }
}

export async function deleteComment(comment: Comment) {
  const headersList = headers();
  const url = clearUrl(headersList.get("referer") || "http://unknown");

  if (!redis) {
    return {
      message: "Unable to connect to Redis",
    };
  }

  try {
    await redis.lrem(url, 0, JSON.stringify(comment));
    return {
      message: "Commentaire ajouté !",
    };
  } catch (_) {
    return {
      message: "Échec de la suppression",
    };
  }
}
