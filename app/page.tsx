import React from "react";
import { Product } from "@/types/types";

import Categories from "@/app/_components/Categories";
import Featured from "@/app/_components/Featured";
import Benefits from "@/app/_components/Benefits";
import Slider from "@/components/Common/Slider/Slider";
import { getSortedItems } from "@/actions/itemActions";
import Recommendations from "./_components/Recommendations";
import ItemPromo from "./_components/ItemPromo";

interface ProductData {
  product: Product[];
}

const page = async ({}) => {
  const { product: cheapItems }: ProductData = await getSortedItems("price");
  const { product: newItems }: ProductData = await getSortedItems("-date");
  const { product: slideItems }: ProductData = await getSortedItems(
    "sort=-rating,price",
    10,
  );

  return (
    <main className="mx-auto max-w-[1700px]">
      <section className="space-y-3 text-center text-2xl font-semibold">
        <h1 className="">
          Welcome to the best place to find everything that you need
        </h1>
        <h2 className="animate-gradient bg-gradient-to-r from-orange-400 via-red-500 to-purple-500 bg-300% bg-clip-text text-4xl font-bold text-transparent">
          Newmarket
        </h2>
      </section>
      <div className="m-auto mb-16 h-[500px] w-[300px] px-4 py-4 xs:w-[340px] ms:w-[460px] sm:w-[600px] md:w-[700px] xl:w-[1000px]">
        <Slider slideItems={slideItems} />
      </div>
      <Recommendations name="The cheapest" items={cheapItems} />
      <Categories />
      <ItemPromo />
      <Recommendations name="Interesting New" items={newItems} />
      <Featured />
      <Benefits />
    </main>
  );
};

export default page;
