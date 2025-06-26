"use client";

import { useParams } from "next/navigation";
import { useSelector } from "react-redux";

const PostDetails = () => {
  const { id } = useParams();
  const posts = useSelector((state) => state.posts.posts);
  const post = posts.find((p) => p._id === id);

  if (!post) {
    return (
      <div className="text-white text-center mt-10">
        <p>Post not found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4 py-10">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-sm text-gray-400 mb-6">
        {new Date(post.createdAt).toLocaleString()}
      </p>
      <p className="text-lg max-w-3xl leading-relaxed">{post.content}</p>
    </div>
  );
};

export default PostDetails;
