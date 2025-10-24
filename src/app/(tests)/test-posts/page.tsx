import Sidebar from "@/components/share/Sidebar";
import TestPostLists from "@/components/tests/TestPostLists";
import React, { Suspense } from "react";

const TestPostsPage = async () => {
  return (
    <React.Fragment>
      <main>
        <Sidebar title="Test-Posts">
          <Suspense fallback={"Loading ... "}>
            <TestPostLists />
          </Suspense>
        </Sidebar>
      </main>
    </React.Fragment>
  );
};

export default TestPostsPage;
