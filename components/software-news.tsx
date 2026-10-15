import { connection } from "next/server";
import { Link as LinkIcon } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { getRandomSoftwareNews } from "@/lib/software-news";

export async function SoftwareNews() {
  await connection();
  const news = await getRandomSoftwareNews();

  if (news.length === 0) {
    return (
      <p className="py-3 text-xs text-muted-foreground sm:text-sm">
        News is unavailable right now.
      </p>
    );
  }

  return (
    <>
      {news.map((item, index) => (
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
      ))}
    </>
  );
}

