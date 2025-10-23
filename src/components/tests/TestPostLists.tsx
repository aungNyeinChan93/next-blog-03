import { getAllPosts } from "@/features/posts/posts-actions";
import React from "react";
import PostCard from "../posts/PostCard";
// import { cacheLife } from "next/cache";

const TestPostLists = async () => {
  //   "use cache";
  //   cacheLife("hours");
  const posts = await getAllPosts({ limit: 10 });
  return (
    <React.Fragment>
      <main className="w-full min-h-screen  px-10">
        <div className="grid grid-col-1  sm:grid-cols-4  gap-2">
          {posts && posts?.map((p) => <PostCard key={p.id} {...p} />)}
        </div>
      </main>
    </React.Fragment>
  );
};

export default TestPostLists;
