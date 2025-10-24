import PostCreateForm from "@/components/posts/PostCreateForm";
import Sidebar from "@/components/share/Sidebar";
import { getServerSession, ServerSession } from "@/features/auth/auth";
import React from "react";

const PostCreatePage = async () => {
  const session: ServerSession = await getServerSession();
  return (
    <React.Fragment>
      <Sidebar title="Create Post">
        <main className="w-full min-h-110 flex justify-center items-center">
          <PostCreateForm session={session} />
        </main>
      </Sidebar>
    </React.Fragment>
  );
};

export default PostCreatePage;
