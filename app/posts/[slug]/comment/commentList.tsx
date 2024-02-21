import { Comment } from "@/app-types";
import distanceToNow from "@/lib/date";
import { deleteComment } from "./actions";

interface Props {
  comments?: Comment[];
  onDelete: () => void;
}

export default function CommentList({ comments, onDelete }: Props) {
  return (
    <div className="mt-10 space-y-6">
      {comments && comments.length > 0 ? (
        comments.map((comment) => {
          return (
            <div key={comment.createdAt} className="flex space-x-4">
              <div>
                <time className="text-gray-400">
                  {distanceToNow(comment.createdAt)}
                </time>
              </div>
              <div>{comment.text}</div>
              <button
                className="text-gray-400 hover:text-red-500"
                onClick={async () => {
                  await deleteComment(comment);
                  onDelete();
                }}
              >
                x
              </button>
            </div>
          );
        })
      ) : (
        <div>No comment</div>
      )}
    </div>
  );
}
