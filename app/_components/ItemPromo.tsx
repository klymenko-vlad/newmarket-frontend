import AnimationItem from "@/components/Common/AnimationItem";
import Image from "next/image";
import Link from "next/link";

export default function ItemPromo() {
  return (
    <section className="mb-10 px-12">
      <div className="hidden h-[400px] w-full items-center justify-between bg-gradient-to-r from-black to-slate-500 px-10 text-white lg:flex">
        <AnimationItem animationType="translate">
          <p className="mb-7 text-green-600">Categories</p>
          <p className="text-4xl font-medium">Enhance Your </p>
          <p className="text-4xl font-medium">Music Experience</p>

          <button
            className="mt-8 h-[56px] w-[171px] rounded-md bg-green-600"
            type="submit"
          >
            <Link href="/product/64a01e675904d6a0b0773e65-Jbl">Buy now!</Link>
          </button>
        </AnimationItem>
        <AnimationItem animationType="fade">
          <Image
            className=""
            width={568}
            height={330}
            src="/banners/jbl.png"
            alt="item for sale"
          />
        </AnimationItem>
      </div>
    </section>
  );
}
