import ArticleList from "@/components/articles/ArticleLists";
import Sidebar from "@/components/share/Sidebar";
import React from "react";

interface Props {
  searchParams: Promise<{ [key: string]: string }>;
}

const ArticelsPage = async ({ searchParams }: Props) => {
  const { page } = await searchParams;
  return (
    <React.Fragment>
      <Sidebar title="">
        <main className="w-full min-h-screen ">
          <ArticleList page={Number(page)} searchParams={await searchParams} />
        </main>
      </Sidebar>
    </React.Fragment>
  );
};

export default ArticelsPage;
