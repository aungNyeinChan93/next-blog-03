import FieldTestForm from "@/components/tests/FieldTestForm";
import React from "react";

const TestFieldPage = async () => {
  return (
    <React.Fragment>
      <main className="w-full min-h-screen flex justify-center items-center">
        <FieldTestForm />
      </main>
    </React.Fragment>
  );
};

export default TestFieldPage;
