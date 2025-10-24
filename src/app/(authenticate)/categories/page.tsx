import CategoryCreateForm from "@/components/categories/CategoryCreateForm";
import CategoryLists from "@/components/categories/CategoryLists";
import Sidebar from "@/components/share/Sidebar";
import React, { Suspense } from "react";

interface Props {
  searchParams: Promise<{ [key: string]: string }>;
}

const CategoriesPage = async ({ searchParams }: Props) => {
  const params = await searchParams;
  return (
    <React.Fragment>
      <Sidebar title="Categories">
        <main className="w-full min-h-screen bg-indigo-100 flex justify-between">
          <div className="flex-1">
            <Suspense fallback={"loading ... "}>
              <CategoryCreateForm />
            </Suspense>
          </div>
          <div className="flex-1">
            <Suspense fallback={"Loading ... "}>
              <CategoryLists searchParams={await searchParams} />
            </Suspense>
          </div>
        </main>
      </Sidebar>
    </React.Fragment>
  );
};

export default CategoriesPage;
