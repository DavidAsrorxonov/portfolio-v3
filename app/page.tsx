import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <main className="min-h-screen bg-background px-6 py-20 text-foreground sm:py-28">
      <section className="mx-auto w-full max-w-3xl">
        <h1 className="text-2xl font-medium leading-snug sm:text-4xl">
          Hello, My name is Dovudkhon. I own a computer and I build stuff
        </h1>

        <ModeToggle />

        <Separator className="my-8" />

        <p className="text-base text-muted-foreground sm:text-lg">
          Placeholder for now
        </p>
      </section>
    </main>
  );
}
