import Image from "next/image";
import { getAllData } from "@/services/data";
import WrapperData from "./_components/WrapperData";
import { Suspense } from "react";
import SwitchTheme from "@/components/shared/SwitchTheme";

export default async function Home() {
  return (
    <div>
      <SwitchTheme />
      <Suspense fallback={<p>Loading</p>}>
        <WrapperData />
      </Suspense>
    </div>
  );
}
