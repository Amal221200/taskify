import { Medal } from "lucide-react";
import Link from "next/link";
import localFont from "next/font/local";

const headingFont = localFont({ src: "../../../public/fonts/font.woff2" });

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function MarketingPage() {

  return (
    <div className="flex items-center justify-center flex-col">
      <div className={cn("flex items-center justify-center flex-col", headingFont.className)}>
        <div className="mb-4 flex items-center border shadow-sm p-4 bg-amber-100 text-amber-700 rounded-full uppercase">
          <Medal className="h-6 w-6 mr-2" /> No 1 task management
        </div>
        <h1 className="text-3xl md:text-6xl text-center text-neutral-800 mb-6">Taskify helps team move</h1>
        <h1 className="text-3xl md:text-6xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 p-2 rounded-md pb-4 w-fit">
          work forward
        </h1>
      </div>
      <h2 className="text-sm md:text-xl text-neutral-400 mt-4 max-w-sm md:max-w-2xl text-center mx-auto">
        Collaborate, manage projects, and reach new productivity peaks. From high rises to the home office, the wat your team works is unique - accomplish it all with Taskify
      </h2>
      <Button className="mt-6" size={"lg"} asChild>
        <Link href="/sign-up">
          Get Taskify for free
        </Link>
      </Button>
    </div>
  );
}
