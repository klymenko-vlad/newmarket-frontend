import type { Metadata } from "next";
import InfinitiveScroll from "@/components/Common/InfinitiveScroll";

interface Props {
  params: { categorySlug: string };
}

export async function generateMetadata({ params }: Props) {
  return {
    title: params.categorySlug[0].toUpperCase() + params.categorySlug.slice(1),
  };
}

export default async function Page({ params }: Props) {
  return <InfinitiveScroll categorySlug={params.categorySlug} />;
}
