import { Button } from "@ui/components/button";
import { Badge } from "@ui/components/badge";

export default function Page(): JSX.Element {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <div>
        <Button>Press Me</Button>
      </div>
    </main>
  );
}
