import { useState } from "react";
import { addComment } from "./actions";

interface Props {
  onSubmit: () => void;
}

export default function CommentForm({ onSubmit }: Props) {
  const [message, setMessage] = useState("");

  async function handleSubmit(formData: FormData) {
    const res = await addComment(formData);
    setMessage(res.message);
    onSubmit();
  }

  return (
    <form action={handleSubmit}>
      <textarea
        className="flex max-h-40 w-full resize-y rounded bg-gray-200 p-3 text-gray-900 placeholder-gray-500"
        rows={2}
        placeholder="What are your thoughts"
        name="text"
      />
      <div className="mt-4 flex items-center">
        <div className="flex items-center space-x-6">
          <button className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-40">
            Send
          </button>
        </div>
      </div>
      <p aria-live="polite" className="sr-only">
        {message}
      </p>
    </form>
  );
}
