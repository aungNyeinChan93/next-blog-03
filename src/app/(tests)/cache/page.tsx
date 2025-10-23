import UserCacheTest from "@/components/tests/UseCache";
import { revalidatePath, revalidateTag } from "next/cache";
import React, { Suspense } from "react";

export async function getAllRecipes() {
  const { recipes } = await fetch("https://dummyjson.com/recipes", {
    cache: "force-cache",
    next: { tags: ["recipes"] },
  }).then((res) => res.json());
  return recipes;
}

const TestCachePage = async () => {
  const recipes = await getAllRecipes();
  return (
    <React.Fragment>
      <main className=" flex justify-between  ">
        <div className="flex-1">
          <form
            action={async () => {
              "use server";
              // revalidateTag("recipes", "default");
              revalidatePath("/cache");
            }}
          >
            <button type="submit">Refresh</button>
          </form>
          <div>{JSON.stringify(recipes, null, 2)}</div>
        </div>
        <div className="flex-1">
          <Suspense fallback={"Loading ... "}>
            <UserCacheTest />
          </Suspense>
        </div>
      </main>
    </React.Fragment>
  );
};

export default TestCachePage;
