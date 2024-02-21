import { Comment } from "@/app-types";
import { FormEvent, useState } from "react";
import useSWR from "swr";

const fetcher = (url: string) => {
  console.log("call to fetcher");
  return fetch(url).then((res) => {
    if (res.ok) {
      return res.json();
    }

    throw new Error(`${res.status} ${res.statusText} while fetching: ${url}`);
  });
};

export default function useComments() {
  const { data: comments, mutate } = useSWR<Comment[]>(
    "/api/comment",
    fetcher,
    { fallbackData: [] },
  );

  return {
    comments,
    mutate,
  };
}
