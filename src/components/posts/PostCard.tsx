"use client";

import { Post } from "@/db/schema";
import Link from "next/link";
import React from "react";

interface Props extends Partial<Post> {}

const PostCard = ({ title, body, user_id, id }: Props) => {
  return (
    <React.Fragment>
      <div className="bg-white border border-gray-200 shadow-md p-6 w-full max-w-sm rounded-lg overflow-hidden mx-auto mt-4">
        <Link href={`/posts/${id}`}>
          <h3 className="text-slate-900 text-lg font-semibold">{title}</h3>
          <p className="mt-2 text-sm text-slate-500">{body}</p>
        </Link>

        {/* <label className="relative block mt-6">
          <input type="checkbox" className="sr-only peer" checked />
          <div className="w-11 h-6 cursor-pointer flex items-center bg-gray-300 rounded-full peer peer-checked:after:translate-x-full after:absolute after:left-[2px] peer-checked:after:border-white after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#007bff]"></div>
        </label> */}
      </div>
    </React.Fragment>
  );
};

export default PostCard;
