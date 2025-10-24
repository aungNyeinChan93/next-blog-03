import {
  type CategoriesWithArticles,
  getAllCategories,
  getTotalCategoryCount,
} from "@/features/categories/category-actions";
import React from "react";
import CategoryCard from "./CategoryCard";
import Pagination from "../share/Pagination";

interface Props {
  searchParams: { [key: string]: string };
}

const CategoryLists = async ({ searchParams }: Props) => {
  const categoryTotalCount = await getTotalCategoryCount();
  const limit = Number(searchParams.limit) || 7;
  const totalPages = Math.max(1, Math.ceil(categoryTotalCount / limit));
  const page = Number(searchParams?.page) || 1;
  const categories: CategoriesWithArticles = await getAllCategories(
    page,
    limit
  );
  return (
    <React.Fragment>
      <main className="w-full max-w-md mx-auto py-2 mt-10">
        {categories &&
          Array.isArray(categories) &&
          categories?.map((category) => (
            <CategoryCard key={category.id} {...category} />
          ))}
        <div>
          <Pagination
            totalPage={totalPages}
            baseUrl="/categories"
            currentPage={page}
            searchParams={searchParams}
          />
        </div>
        {/* <pre>{JSON.stringify(searchParams, null, 2)}</pre> */}
      </main>
    </React.Fragment>
  );
};

export default CategoryLists;
