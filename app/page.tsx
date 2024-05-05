import ContainerData from "./_components/ContainerData";
import { Suspense } from "react";
import SwitchTheme from "@/components/shared/SwitchTheme";
import { Skeleton } from "@/components/ui/skeleton";
import SkeletonData from "./_components/SkeletonData";

export default async function Home() {
  return (
    <section className="container mx-auto">
      <SwitchTheme />
      <Suspense fallback={<SkeletonData />}>
        <ContainerData />
      </Suspense>
    </section>
  );
}
