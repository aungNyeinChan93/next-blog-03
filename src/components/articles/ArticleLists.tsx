import {
  type ArticlesWithAuthorAndCategory,
  getAllArticles,
  getArticleTotalCount,
} from "@/features/articles/article-actions";
import React from "react";
import Pagination from "../share/Pagination";
import ArticleCard from "./ArticleCard";
import { Card } from "../ui/card";
import Link from "next/link";
import { json } from "zod";

interface Props {
  page: number;
  searchParams: { [key: string]: string };
}

const ArticleList = async ({ page, searchParams }: Props) => {
  const limit = 6;
  const articles: ArticlesWithAuthorAndCategory = await getAllArticles({
    page,
    limit,
  });
  const articleTotalCount = await getArticleTotalCount();

  const totalPages = Math.max(1, Math.ceil(articleTotalCount / limit));

  return (
    <React.Fragment>
      <main className="flex flex-col gap-8 min-h-screen w-full bg-indigo-200 p-10 rounded-sm">
        <div>
          <Card className="">
            <div className="flex justify-between px-10">
              <p className="text-xl font-semibold text-indigo-600">Articles</p>
              <Link className="" href={"/articles/create"}>
                ➕
              </Link>
            </div>
          </Card>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {Array.isArray(articles) &&
            articles?.map((article) => (
              <ArticleCard key={article.id} {...article} />
            ))}
        </div>
        <div>
          <Pagination
            totalPage={totalPages}
            currentPage={page}
            baseUrl="/articles"
            searchParams={{ q: searchParams.q }}
          />
        </div>
      </main>
    </React.Fragment>
  );
};

export default ArticleList;
