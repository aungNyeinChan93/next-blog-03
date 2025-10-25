"use client";

import Link from "next/link";
import React from "react";

interface Props {
  title: string;
  body: string;
  id: string;
}

const ArticleCard = ({ title, body, id }: Props) => {
  return (
    <React.Fragment>
      <div className="bg-white borde min-h-40  border-gray-200 shadow-md w-full max-w-sm rounded-lg overflow-hidden mx-auto mt-4">
        <div className="p-6">
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
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
