"use client";

import { type Posts } from "@/features/posts/posts-actions";
import React, { use, useEffect } from "react";
import PostCard from "./PostCard";
import Pagination from "../share/Pagination";
import { useSearchParams } from "next/navigation";
import { totalPostsCount } from "@/features/posts/posts-utils";

interface Props {
  postsPromise: Promise<Posts>;
  totalCount: number;
}

const PostLists = ({ postsPromise, totalCount }: Props) => {
  const posts = use(postsPromise);

  const searchParams = useSearchParams();
  const q = searchParams.get("q");
  const page = searchParams.get("page");
  const limit = 2;
  const totalPage = Math.max(1, Math.ceil(Number(totalCount) / limit));

  return (
    <React.Fragment>
      <main className="flex flex-col gap-4 w-full max-w-7xl px-6 py-4 justify-center mx-auto ">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 min-h-120">
          {posts &&
            Array.isArray(posts) &&
            posts?.map((post) => <PostCard key={post?.id} {...post} />)}
        </div>
        <div>
          <Pagination
            searchParams={{ q: q! }}
            totalPage={totalPage}
            currentPage={Number(page)}
            baseUrl={"/posts"}
          />
        </div>
      </main>
    </React.Fragment>
  );
};

export default PostLists;
