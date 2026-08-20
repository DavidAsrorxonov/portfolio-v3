import { connection } from "next/server";
import { GripVertical, Link as LinkIcon } from "lucide-react";

import { GitHub } from "@/components/icons/github";
import { NPM } from "@/components/icons/npm";
import { Telegram } from "@/components/icons/telegram";
import { ModeToggle } from "@/components/mode-toggle";
import { projects } from "@/constants/projects";
import { Separator } from "@/components/ui/separator";
import { getRandomSoftwareNews } from "@/lib/software-news";

const socials = [
  {
    name: "GitHub",
    url: "https://github.com/DavidAsrorxonov",
    icon: GitHub,
  },
  {
    name: "npm",
    url: "https://www.npmjs.com/~david021106",
    icon: NPM,
  },
  {
    name: "Telegram",
    url: "https://t.me/whoisdave02",
    icon: Telegram,
  },
];

export default async function Home() {
  await connection();
  const news = await getRandomSoftwareNews();

  return (
    <main className="min-h-screen bg-background px-5 py-8 text-foreground sm:py-12">
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-2xl flex-col sm:min-h-[calc(100vh-6rem)]">
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

        <div className="mt-auto pt-5">
          <Separator className="mb-5" />

          <footer className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              {socials.map(({ name, url, icon: Icon }) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={name}
                  className="flex size-8 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted"
                >
                  <Icon className="size-4" aria-hidden="true" />
                </a>
              ))}
            </div>

            <ModeToggle />
          </footer>
        </div>
      </section>
    </main>
  );
}
