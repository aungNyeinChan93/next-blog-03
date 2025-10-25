"use client";

import Link from "next/link";
import React from "react";

interface Props {
  totalPage: number;
  currentPage: number;
  baseUrl: string;
  searchParams?: { [key: string]: string };
}

const Pagination = ({
  totalPage = 10,
  currentPage,
  baseUrl,
  searchParams,
}: Props) => {
  return (
    <React.Fragment>
      <div className="flex space-x-5 justify-center">
        <Link
          href={`${baseUrl}?${new URLSearchParams({
            ...searchParams,
            page: currentPage > 1 ? String(currentPage - 1) : "1",
          })}`}
          className={`flex items-center justify-center shrink-0 hover:bg-gray-50 cursor-pointer w-9 h-9 rounded-md ${
            currentPage <= 1 && "hover:bg-red-200"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 fill-gray-400"
            viewBox="0 0 55.753 55.753"
          >
            <path
              d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z"
              data-original="#000000"
            />
          </svg>
        </Link>
        {Array.from({ length: totalPage })?.map((_link, idx) => (
          <Link
            key={idx}
            href={`${baseUrl}?${new URLSearchParams({
              ...searchParams,
              page: String(idx + 1),
            })}`}
            className={`flex items-center justify-center shrink-0 hover:bg-gray-50 cursor-pointer text-base font-semibold text-slate-900 px-[13px] h-9 rounded-md ${
              currentPage == idx + 1 && "bg-indigo-500"
            }`}
          >
            {idx + 1}
          </Link>
        ))}

        <Link
          href={`${baseUrl}?${new URLSearchParams({
            ...searchParams,
            page:
              currentPage < totalPage
                ? String(currentPage + 1)
                : String(totalPage),
          })}`}
          className={`flex items-center justify-center shrink-0 hover:bg-gray-50 cursor-pointer w-9 h-9 rounded-md ${
            currentPage >= totalPage && "hover:bg-red-200"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 fill-gray-400 rotate-180"
            viewBox="0 0 55.753 55.753"
          >
            <path
              d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z"
              data-original="#000000"
            />
          </svg>
        </Link>
      </div>
      {/* <pre>{JSON.stringify(searchParams, null, 2)}</pre> */}
    </React.Fragment>
  );
};

export default Pagination;
