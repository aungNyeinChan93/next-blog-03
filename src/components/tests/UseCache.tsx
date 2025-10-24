import { cacheLife, cacheTag, revalidateTag } from "next/cache";
import React from "react";

export async function getAllQuotes() {
  const { quotes } = await fetch(`https://dummyjson.com/quotes`, {
    next: { tags: ["quotes"] },
  }).then((res) => res.json());
  return quotes;
}

async function refreshQuotes() {
  "use server";
  revalidateTag("quotes", "default");
}

const UserCacheTest = async () => {
  // "use cache";
  // cacheTag("quotes");
  // cacheLife("hours");

  const quotes = await getAllQuotes();

  return (
    <React.Fragment>
      <main className=" px-10 bg-red-50">
        <form action={refreshQuotes}>
          <button type="submit">Refresh Quotes</button>
        </form>
        {Array.isArray(quotes) &&
          quotes?.map((q: any) => <div key={q.id}>{q.quote}</div>)}
      </main>
    </React.Fragment>
  );
};

export default UserCacheTest;
