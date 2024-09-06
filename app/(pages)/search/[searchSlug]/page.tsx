import InfinitiveScroll from "@/components/Common/InfinitiveScroll";
import truncateString from "@/utils/truncateString";

export async function generateMetadata({
  params,
}: {
  params: { searchSlug: string };
}) {
  return {
    title: `Search: ${truncateString(params.searchSlug, 17)}`,
    description:
      "Explore our intuitive product search page designed to help you quickly find exactly what you're looking for. Whether you're shopping for electronics, clothing, home goods, or more, our advanced filters and sorting options allow you to easily narrow down your choices and compare prices. Discover the best deals tailored to your preferences, and enjoy a hassle-free shopping experience with our user-friendly interface. Start your search now and find the perfect product that meets your needs and budget.",
  };
}

interface PageProps {
  params: { searchSlug: string };
}

export default function Page({ params }: PageProps) {
  return <InfinitiveScroll searchSlug={params.searchSlug} />;
}
