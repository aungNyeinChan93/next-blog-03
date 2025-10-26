"use client";

import { Category } from "@/lib/zod-schemas/category-schema";
import { User } from "better-auth";
import Link from "next/link";
import React from "react";

interface Props {
  title: string;
  body: string;
  id: string;
  author: User;
  categories?: any[];
}

const ArticleCard = ({ title, body, id, author, categories }: Props) => {
  return (
    <React.Fragment>
      <div className="bg-white borde min-h-40  border-gray-200 shadow-md w-full max-w-lg rounded-lg overflow-hidden mx-auto mt-4">
        <div className="p-6">
          <div>
            <h3 className="text-lg font-semibold">
              {title} || {author?.name}
            </h3>
            <h2 className="text-sm text-gray-400 my-2 p-2 inline-block bg-red-50 rounded-2xl">
              {categories?.map((c) => c?.category?.name)}
            </h2>
            <p className="mt-2 text-sm text-slate-500 leading-relaxed">
              {body}
            </p>
          </div>
          <div className="mt-6 inline-block px-5 py-2 rounded-md text-white text-sm font-medium tracking-wider border-none outline-none bg-blue-600 hover:bg-blue-700 cursor-pointer">
            <Link href={`/articles/${id}`}>View</Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ArticleCard;
