import ContainerData from "./_components/ContainerData";
import { Suspense } from "react";
import SwitchTheme from "@/components/shared/SwitchTheme";

export default async function Home() {
  return (
    <section className="container mx-auto">
      <SwitchTheme />
      <Suspense fallback={<p>Loading</p>}>
        <ContainerData />
      </Suspense>
    </section>
  );
}
