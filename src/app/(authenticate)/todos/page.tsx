import Sidebar from "@/components/share/Sidebar";
import TodoLists from "@/components/todos/TodoLists";
import { getServerSession, ServerSession } from "@/features/auth/auth";
import React, { Suspense } from "react";

const TodosPage = async () => {
  const session: ServerSession = await getServerSession();
  return (
    <React.Fragment>
      <Sidebar title="Todo LIsts">
        <main className="w-full min-h-screen">
          <Suspense fallback={"Loading ... "}>
            <TodoLists user_id={session?.user?.id!} />
          </Suspense>
        </main>
      </Sidebar>
    </React.Fragment>
  );
};

export default TodosPage;
