import { getServerSession, ServerSession } from "@/features/auth/auth";
import React from "react";

const TestAuthPage = async () => {
  const session: ServerSession = await getServerSession();

  return (
    <React.Fragment>
      <main>
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </main>
    </React.Fragment>
  );
};

export default TestAuthPage;
