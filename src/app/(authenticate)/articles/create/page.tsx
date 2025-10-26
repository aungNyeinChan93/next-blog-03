import ArticleCreateForm from "@/components/articles/ArticleCreateForm";
import Sidebar from "@/components/share/Sidebar";
import {
  getAllCategories,
  getTotalCategoryCount,
} from "@/features/categories/category-actions";
import React from "react";

const ArticleCreatePage = async () => {
  const totalCategorires = await getTotalCategoryCount();
  const categories = await getAllCategories(1, totalCategorires);
  console.log({ categories });

  return (
    <React.Fragment>
      <Sidebar>
        <main className="w-full min-h-screen flex justify-center items-center bg-indigo-100 rounded">
          <ArticleCreateForm categories={categories} />
        </main>
      </Sidebar>
    </React.Fragment>
  );
};

export default ArticleCreatePage;
