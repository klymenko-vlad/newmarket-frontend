import Link from "next/link";

import { Product } from "@/types/types";
import EditProductForm from "./_components/EditProductForm";
import SliderForItem from "../_components/SliderForItem";
import { renderFilledStars } from "@/components/Common/ItemPreview/ItemPreview";
import truncateString from "@/utils/truncateString";
import { getProductData } from "@/actions/itemActions";

interface Props {
  params: { productId: string };
}

export default async function Page({ params }: Props) {
  const product: Product = await getProductData(params.productId.split("-")[0]);

  const slides = [product.mainPicture];

  if (product.pictures) {
    slides.push(...product.pictures);
  }

  return (
    <main className="w-full px-6">
      <nav
        className="mb-3 flex w-full items-center space-x-3"
        aria-label="breadcrumb"
      >
        <Link
          className="duration-600 hidden text-black transition-colors ease-in-out hover:text-red-400 sm:block"
          href="/"
        >
          New Market
        </Link>
        <span aria-hidden="true" className="hidden sm:block">
          /
        </span>
        <Link
          className="duration-600 hidden text-black transition-colors ease-in-out hover:text-red-400 sm:block"
          href={`/category/${product.category}`}
        >
          {product.category}
        </Link>
        <span aria-hidden="true" className="hidden sm:block">
          /
        </span>
        <span className="text-red-500">{truncateString(product.name, 25)}</span>
        <span aria-hidden="true">/</span>
        <p>edit</p>
      </nav>

      <div className="flex w-full flex-wrap items-start justify-center md:flex-nowrap md:space-x-6">
        <div className="flex items-center justify-center">
          <div className="">
            <div className="mx-auto w-[280px] ms:w-[380px]">
              <SliderForItem slideItems={slides} />
            </div>
            <div className="mx-4">
              <h1 className="my-3 text-lg font-semibold">{product.name}</h1>
              <div className="mb-3 flex justify-center ms:justify-normal">
                <div className="flex items-center">
                  {renderFilledStars(product.rating)}
                  <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                    {product.rating} out of 5
                  </p>
                </div>
              </div>
              <div className="mb-5 flex justify-normal">
                <h2>
                  <span className="text-lg font-semibold">
                    ${product.price}
                  </span>
                  {product.pastPrice && (
                    <span className="ml-3 text-sm font-medium text-red-900 line-through">
                      ${product?.pastPrice}
                    </span>
                  )}
                  {"  "}| Seller:{" "}
                  {product?.user?.name ? product.user.name : "Unknown"} |{" "}
                  <span
                    className={` ${
                      product.quantity >= 1 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {product.quantity >= 1 ? " In stock" : " Not available"}
                  </span>
                </h2>
              </div>
              <p className="max-w-[300px]">{product.description}</p>
            </div>
          </div>
        </div>

        <div className="my-10 block h-px w-full bg-gray-400 md:hidden"></div>

        <EditProductForm product={product} />
      </div>
    </main>
  );
}
