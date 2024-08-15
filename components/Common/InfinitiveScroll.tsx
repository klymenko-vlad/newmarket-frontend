"use client";

import React, { useEffect, useState } from "react";
import { Product } from "@/types/types";
import { getDataInfinitiveScroll } from "@/actions/infinitiveScrollActions";
import ItemPreview from "./ItemPreview/ItemPreview";
import ItemPreviewLoading from "./ItemPreview/ItemPreviewLoading";
import truncateString from "@/utils/truncateString";

const LIMIT = 15;
const MARGIN_BOTTOM = 800;

export default function InfinitiveScroll({
  categorySlug,
  searchSlug,
  myPageSlug,
}: {
  categorySlug?: string;
  searchSlug?: string;
  myPageSlug?: string;
}) {
  const [items, setItems] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [hasMoreItems, setHasMoreItems] = useState(false);
  const [sortOption, setSortOption] = useState<string>("-date");

  const [tempPriceFrom, setTempPriceFrom] = useState<number>(0);
  const [tempPriceTo, setTempPriceTo] = useState<number>(999999);
  const [priceFrom, setPriceFrom] = useState<number>(0);
  const [priceTo, setPriceTo] = useState<number>(999999);

  const handlePriceFromChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTempPriceFrom(Number(event.target.value));
  };

  const handlePriceToChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTempPriceTo(Number(event.target.value));
  };

  const handleApplyPrice = () => {
    setPriceFrom(tempPriceFrom);
    setPriceTo(tempPriceTo);
    setItems([]);
    setCurrentPage(1);
    setTotalCount(0);
    setHasMoreItems(false);
    setIsFetching(true);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value);
    setItems([]);
    setCurrentPage(1);
    setTotalCount(0);
    setHasMoreItems(false);

    setIsFetching(true);
  };

  const scrollHandler = (e: Event) => {
    if (hasMoreItems) return;

    if (
      document.documentElement?.scrollHeight -
        (document.documentElement.scrollTop + window.innerHeight) <=
        MARGIN_BOTTOM &&
      items.length - totalCount !== 0
    ) {
      setIsFetching(true);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);

    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, [totalCount, items]);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const { product, total } = await getDataInfinitiveScroll(
          myPageSlug ? `item/user/${myPageSlug}/` : "item",
          currentPage,
          LIMIT,
          sortOption,
          priceTo,
          priceFrom,
          categorySlug,
          searchSlug,
        );
        if (product.length < 1) {
          return setHasMoreItems(true);
        }
        setItems((prevItems) => [...prevItems, ...product]);
        setCurrentPage((prevPage) => prevPage + 1);
        setTotalCount(+total);
        if (product.length < LIMIT) {
          setHasMoreItems(true);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsFetching(false);
      }
    };

    if (isFetching) {
      getProduct();
    }
  }, [isFetching]);

  return (
    <main className="w-full p-10">
      <section className="mb-6">
        <div className="mb-6 flex items-center">
          <div className="h-[40px] w-[20px] rounded-[10%] bg-red-500"></div>
          <p className="ml-5 font-medium text-red-500">Find what you need</p>
        </div>
        <h3 className="text-2xl font-semibold">
          {searchSlug ? (
            <p>
              Search for{" "}
              <span className="text-red-500">
                {truncateString(searchSlug, 30)}
              </span>
            </p>
          ) : myPageSlug ? (
            "That`s all Products that you sold"
          ) : (
            "Explore Our Products"
          )}
          {categorySlug && ` in ${categorySlug.toUpperCase()} category`}
        </h3>
      </section>
      <section className="grid grid-cols-1 items-center gap-3 md:mx-4 md:grid-cols-2">
        <div className="block">
          <div>
            <label
              htmlFor="Sort"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              Select an option
            </label>
            <select
              id="Sort"
              name="select"
              value={sortOption}
              className="mb-8 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-red-500 focus:ring-red-500 md:w-64"
              onChange={handleSelectChange}
            >
              <option value="-date">Novelties</option>
              <option value="price">Cheap to expensive</option>
              <option value="-price">Expensive to cheap</option>
              <option value="-rating">By rating</option>
            </select>
          </div>
        </div>

        <div className="block items-center justify-center md:flex">
          <p className="mr-4">Price:</p>
          <div className="flex items-center">
            <input
              type="number"
              id="priceFrom"
              onChange={handlePriceFromChange}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-red-500 focus:ring-red-500"
              placeholder="0"
              required
            />
          </div>
          <div className="mx-4 text-center">-</div>
          <div className="flex items-center">
            <input
              type="number"
              id="priceTo"
              onChange={handlePriceToChange}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-red-500 focus:ring-red-500"
              placeholder="99999"
              required
            />
          </div>
          <div className="block justify-start md:flex">
            <button
              type="button"
              onClick={handleApplyPrice}
              className="my-4 rounded-lg border border-red-700 px-5 py-2.5 text-center text-sm font-medium text-red-700 hover:bg-red-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 md:my-0 md:ml-4"
            >
              Apply
            </button>
          </div>
        </div>
      </section>

      <section className="group m-auto">
        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {items.map((item) => (
            <ItemPreview
              product={item}
              key={item._id}
              itemForEdit={Boolean(myPageSlug)}
            />
          ))}
          {isFetching &&
            Array.from({ length: 5 }).map((_, i) => (
              <ItemPreviewLoading key={i} />
            ))}
        </div>
        {hasMoreItems && items.length !== 0 && (
          <h3 className="my-4 text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
            That's All
          </h3>
        )}
        {items.length <= 0 && !isFetching && (
          <h3 className="mb-4 text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
            Nothing was found
          </h3>
        )}
      </section>
    </main>
  );
}
