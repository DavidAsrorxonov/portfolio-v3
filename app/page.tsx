import { connection } from "next/server";
import { GripVertical, Link as LinkIcon } from "lucide-react";

import { projects } from "@/constants/projects";
import { Separator } from "@/components/ui/separator";
import { getRandomSoftwareNews } from "@/lib/software-news";

export default async function Home() {
  await connection();
  const news = await getRandomSoftwareNews();

  return (
    <main className="min-h-screen bg-background px-5 py-8 text-foreground sm:py-12">
      <section className="mx-auto w-full max-w-2xl">
        <h1 className="text-xl font-medium leading-snug sm:text-2xl">
          Hello, My name is Dovudkhon. I own a computer and I build stuff
        </h1>

        <Separator className="my-5" />

        <div>
          {projects.map((project, index) => (
            <div key={project.name}>
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="group flex gap-3 py-3"
              >
                <GripVertical
                  aria-hidden="true"
                  className="mt-1 size-3.5 shrink-0 text-muted-foreground"
                />
                <div>
                  <h2 className="text-sm font-medium group-hover:underline">
                    {project.name}
                  </h2>
                  <p className="mt-0.5 text-xs leading-5 text-muted-foreground sm:text-sm">
                    {project.description}
                  </p>
                </div>
              </a>
              {index < projects.length - 1 ? <Separator /> : null}
            </div>
          ))}
        </div>

        <Separator className="my-5" />

        <section>
          <h2 className="text-xs font-medium text-muted-foreground">
            Latest software engineering news
          </h2>

          <div className="mt-2">
            {news.length > 0 ? (
              news.map((item, index) => (
                <div key={item.id}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex gap-3 py-3"
                  >
                    <LinkIcon
                      aria-hidden="true"
                      className="mt-1 size-3.5 shrink-0 text-muted-foreground"
                    />
                    <h3 className="text-xs leading-5 group-hover:underline sm:text-sm">
                      {item.title}
                    </h3>
                  </a>
                  {index < news.length - 1 ? <Separator /> : null}
                </div>
              ))
            ) : (
              <p className="py-3 text-xs text-muted-foreground sm:text-sm">
                News is unavailable right now.
              </p>
            )}
          </div>
        </section>
      </section>
    </main>
  );
}
