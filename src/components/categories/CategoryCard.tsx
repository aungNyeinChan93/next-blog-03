"use client";

import React from "react";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";

interface Props {
  name?: string;
}

const CategoryCard = ({ name }: Props) => {
  return (
    <React.Fragment>
      <main className="bg-red-50 rounded-2xl my-2">
        <Item>
          <ItemHeader>{name}</ItemHeader>
          {/* <ItemMedia /> */}
          {/* <ItemContent>
            <ItemTitle>Item</ItemTitle>
            <ItemDescription>Item</ItemDescription>
          </ItemContent> */}
          {/* <ItemActions /> */}
          {/* <ItemFooter>Item Footer</ItemFooter> */}
        </Item>
      </main>
    </React.Fragment>
  );
};

export default CategoryCard;
