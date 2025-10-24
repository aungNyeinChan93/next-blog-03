import Sidebar from "@/components/share/Sidebar";
import { getTodoById } from "@/features/todos/todos-actions";
import { Metadata } from "next";
import React from "react";

interface Props {
  params: Promise<{ todoId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { todoId } = await params;
  const todo = await getTodoById(todoId);

  return {
    title: `Todo -${todo?.id}`,
    description: `${todo?.task}`,
  };
}

const TodoDetailPage = async ({ params }: Props) => {
  const { todoId } = await params;
  const todo = await getTodoById(todoId);

  return (
    <React.Fragment>
      <Sidebar title="">
        <main>
          <pre>{JSON.stringify(todo, null, 2)}</pre>
        </main>
      </Sidebar>
    </React.Fragment>
  );
};

export default TodoDetailPage;
