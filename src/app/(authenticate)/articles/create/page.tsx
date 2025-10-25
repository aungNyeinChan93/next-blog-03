import ArticleCreateForm from "@/components/articles/ArticleCreateForm";
import Sidebar from "@/components/share/Sidebar";
import React from "react";

const ArticleCreatePage = async () => {
  return (
    <React.Fragment>
      <Sidebar>
        <main className="w-full min-h-screen flex justify-center items-center bg-indigo-100 rounded">
          <ArticleCreateForm />
        </main>
      </Sidebar>
    </React.Fragment>
  );
};

export default ArticleCreatePage;
