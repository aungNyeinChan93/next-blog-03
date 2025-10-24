"use client";

import React, { Activity, useState } from "react";

const ReactTest = () => {
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <React.Fragment>
      <main className="w-full min-h-screen flex justify-center items-center ">
        <Activity mode={isOpen ? "visible" : "hidden"}>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum ipsa
            eius velit provident. Sint explicabo omnis ratione, nulla unde,
            inventore iste voluptatum eveniet repellendus assumenda
            voluptatibus, nam quidem qui est!
          </p>
        </Activity>
        <button
          className="px-4 py-2 rouned-lg bg-indigo-200 "
          onClick={() => setOpen(!isOpen)}
        >
          Open /Close
        </button>
      </main>
    </React.Fragment>
  );
};

export default ReactTest;
