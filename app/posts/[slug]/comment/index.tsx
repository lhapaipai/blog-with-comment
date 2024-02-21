"use client";

import CommentForm from "./commentForm";
import CommentList from "./commentList";
import useComments from "./useComments";

export default function Comments() {
  const { comments, mutate } = useComments();

  return (
    <div className="mt-20">
      <CommentForm onSubmit={() => mutate()} />
      <CommentList comments={comments} onDelete={() => mutate()} />
    </div>
  );
}
