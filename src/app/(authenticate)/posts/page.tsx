import PostLists from "@/components/posts/PostLists";
import Sidebar from "@/components/share/Sidebar";
import { getAllPosts, totalPostCount } from "@/features/posts/posts-actions";
import { totalPostsCount } from "@/features/posts/posts-utils";
import { Metadata } from "next";
import React, { Suspense, use } from "react";

export const metadata: Metadata = {
  title: "Posts Page 📪",
  description: " this is all about of blog post",
};

interface Props {
  searchParams: Promise<{ [key: string]: string }>;
}

const PostsPage = ({ searchParams }: Props) => {
  const params = use(searchParams);
  const page = Number(params.page) || 1;
  const postPromise = getAllPosts({ limit: 3, page });
  const totalCountPromise = totalPostsCount();
  return (
    <React.Fragment>
      <main className="w-full min-h-screen bg-indigo-100 flex flex-col gap-3">
        <Sidebar title="Posts">
          <Suspense fallback={"Loading .. "}>
            <PostLists
              totalCountPromise={totalCountPromise}
              postsPromise={postPromise}
            />
          </Suspense>
        </Sidebar>
      </main>
    </React.Fragment>
  );
};

export default PostsPage;
