import InfinitiveScroll from "@/components/Common/InfinitiveScroll";

interface Props {
  params: { userId: string };
}

export default function Page({ params }: Props) {
  return <InfinitiveScroll myPageSlug={params.userId} />;
}
