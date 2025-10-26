import { db } from "@/db/drizzle";
import React from "react";

const TestCategoryPage = async () => {
  const categories: CategoriesWithArticle = await getAllCategoryWithArticle();
  return (
    <React.Fragment>
      <main>
        <pre>{JSON.stringify(categories, null, 2)}</pre>
      </main>
    </React.Fragment>
  );
};

export default TestCategoryPage;

export type CategoriesWithArticle = Awaited<
  ReturnType<typeof getAllCategoryWithArticle>
>;
export async function getAllCategoryWithArticle() {
  "use server";
  const categories = await db.query.categoryTable.findMany({
    with: { articles: { with: { article: true } } },
  });
  return categories;
}
