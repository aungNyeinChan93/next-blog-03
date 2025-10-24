import { getALlTodos } from "@/features/todos/todos-actions";
import { cacheLife, cacheTag } from "next/cache";
import Link from "next/link";
import React from "react";

const TodoLists = async ({ user_id }: { user_id: string }) => {
  //   "use cache";
  //   cacheTag("todos");
  //   cacheLife("minutes");

  const todos = await getALlTodos({ user_id });

  return (
    <React.Fragment>
      <main className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {todos &&
            Array.isArray(todos) &&
            todos?.map((todo) => (
              <Link href={`/todos/${todo?.id}`} key={todo?.id}>
                {todo?.task}
              </Link>
            ))}
        </div>
      </main>
    </React.Fragment>
  );
};

export default TodoLists;
