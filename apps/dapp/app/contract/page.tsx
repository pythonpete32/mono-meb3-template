import SimpleStorageComponent from "./_components/SimpleStorage";
import {
  simpleStorageAbi,
  simpleStorageAddress,
} from "../../components/generated";
import { readContract } from "@wagmi/core";
import { serverConfig } from "../../config/wagmi/wagmi.server";

export default async function Page(): Promise<JSX.Element> {
  const initialData = await readContract(serverConfig, {
    abi: simpleStorageAbi,
    address: simpleStorageAddress[69420],
    functionName: "get",
  });

  return (
    <main className="flex flex-col items-center pt-60 min-h-screen">
      <SimpleStorageComponent initialData={initialData} />
    </main>
  );
}
