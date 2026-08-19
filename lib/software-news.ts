export type SoftwareNewsItem = {
  id: number;
  title: string;
  url: string;
};

type HackerNewsItem = {
  id: number;
  type?: string;
  title?: string;
  url?: string;
  deleted?: boolean;
  dead?: boolean;
};

const HACKER_NEWS_API_URL = "https://hacker-news.firebaseio.com/v0";
const HACKER_NEWS_ITEM_URL = "https://news.ycombinator.com/item?id=";

export async function getRandomSoftwareNews(
  limit = 2,
): Promise<SoftwareNewsItem[]> {
  try {
    const response = await fetch(`${HACKER_NEWS_API_URL}/newstories.json`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return [];
    }

    const ids = (await response.json()) as number[];
    const latestIds = ids.slice(0, 20);
    const items = await Promise.all(latestIds.map(getHackerNewsItem));

    return shuffle(
      items
        .filter((item): item is HackerNewsItem & { title: string } =>
          Boolean(
            item &&
              item.type === "story" &&
              item.title &&
              !item.deleted &&
              !item.dead,
          ),
        )
        .map((item) => ({
          id: item.id,
          title: item.title,
          url: item.url ?? `${HACKER_NEWS_ITEM_URL}${item.id}`,
        })),
    ).slice(0, limit);
  } catch {
    return [];
  }
}

async function getHackerNewsItem(id: number) {
  const response = await fetch(`${HACKER_NEWS_API_URL}/item/${id}.json`, {
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as HackerNewsItem | null;
}

function shuffle<T>(items: T[]) {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[index],
    ];
  }

  return shuffled;
}
