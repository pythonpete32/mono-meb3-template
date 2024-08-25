import SimpleStorageComponent from "./_components/SimpleStorage";
import { unstable_noStore as noStore } from "next/cache";
import {
  simpleStorageAbi,
  simpleStorageAddress,
} from "../../components/generated";
import { readContract } from "@wagmi/core";
import { serverConfig } from "../../config/wagmi/wagmi.server";
import { Suspense } from "react";

async function fetchInitialData() {
  noStore(); // This prevents the result from being cached

  const initialData = await readContract(serverConfig, {
    abi: simpleStorageAbi,
    address: simpleStorageAddress[69420],
    functionName: "get",
  });

  return initialData;
}

export default async function Page(): Promise<JSX.Element> {
  const initialData = await fetchInitialData();

  return (
    <main className="flex flex-col items-center pt-60 min-h-screen">
      <Suspense fallback={<div>Loading...</div>}>
        <SimpleStorageComponent initialData={initialData} />
      </Suspense>
    </main>
  );
}
