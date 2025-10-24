import Sidebar from "@/components/share/Sidebar";
import CreateTodoForm from "@/components/todos/CreateTodoForm";
import React from "react";

const TodoCreatePage = async () => {
  return (
    <React.Fragment>
      <Sidebar title="Create Todo">
        <main className="w-full h-110 flex justify-center items-center">
          <CreateTodoForm />
        </main>
      </Sidebar>
    </React.Fragment>
  );
};

export default TodoCreatePage;
