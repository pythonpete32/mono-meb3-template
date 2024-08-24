import { Button } from "@ui/components/button";
import ConnectButton from "../components/ConnectButton";

export default function Page(): JSX.Element {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <div>
        <ConnectButton />
      </div>
    </main>
  );
}
