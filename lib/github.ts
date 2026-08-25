// GitHub's contribution calendar is exposed via GraphQL API (requires token)
// or via GitHub's public user contributions page (fallback).
// Set GITHUB_TOKEN (PAT, read:user scope) in .env.local or Vercel settings for GraphQL.
// If GITHUB_TOKEN is not provided, it falls back to public scraper.

export const CONTRIBUTIONS_TAG = "github-contributions";

export type ContributionDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export type ContributionCalendar = {
  total: number;
  weeks: ContributionDay[][];
};

const LEVELS: Record<string, 0 | 1 | 2 | 3 | 4> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

const QUERY = `
  query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              weekday
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

async function fetchPublicContributions(
  login: string
): Promise<ContributionCalendar | null> {
  try {
    const res = await fetch(`https://github.com/users/${login}/contributions`, {
      headers: {
        "User-Agent": "itsdevesh.me (+https://itsdevesh.me)",
      },
      next: { revalidate: 3600, tags: [CONTRIBUTIONS_TAG] },
    });

    if (!res.ok) return null;
    const html = await res.text();

    const totalMatch = html.match(/([\d,]+)\s+contributions\s+in the last year/i);
    const total = totalMatch ? parseInt(totalMatch[1].replace(/,/g, ""), 10) : 0;

    const cellRegex =
      /<td[^>]*data-date="(\d{4}-\d{2}-\d{2})"[^>]*data-level="(\d)"|<td[^>]*data-level="(\d)"[^>]*data-date="(\d{4}-\d{2}-\d{2})"/g;

    const dayMap = new Map<string, 0 | 1 | 2 | 3 | 4>();
    let match;
    while ((match = cellRegex.exec(html)) !== null) {
      const date = match[1] || match[4];
      const levelNum = parseInt(match[2] || match[3], 10);
      const level = (levelNum >= 0 && levelNum <= 4 ? levelNum : 0) as 0 | 1 | 2 | 3 | 4;
      if (date) {
        dayMap.set(date, level);
      }
    }

    if (dayMap.size === 0) return null;

    const sortedDates = Array.from(dayMap.keys()).sort();
    const startDate = new Date(sortedDates[0]);
    const endDate = new Date(sortedDates[sortedDates.length - 1]);

    const weeks: ContributionDay[][] = [];
    let currentWeek: ContributionDay[] = Array.from({ length: 7 }, () => ({
      date: "",
      count: 0,
      level: 0 as const,
    }));

    let curr = new Date(startDate);
    while (curr <= endDate) {
      const dateStr = curr.toISOString().split("T")[0];
      const weekday = curr.getUTCDay();
      const level = dayMap.get(dateStr) ?? 0;

      currentWeek[weekday] = {
        date: dateStr,
        count: level > 0 ? level * 2 : 0,
        level,
      };

      if (weekday === 6 || dateStr === sortedDates[sortedDates.length - 1]) {
        weeks.push(currentWeek);
        currentWeek = Array.from({ length: 7 }, () => ({
          date: "",
          count: 0,
          level: 0 as const,
        }));
      }

      curr.setUTCDate(curr.getUTCDate() + 1);
    }

    return { total, weeks };
  } catch (err) {
    console.warn("[contributions] public fetch failed:", err);
    return null;
  }
}

export async function getContributions(
  login: string
): Promise<ContributionCalendar | null> {
  const token = process.env.GITHUB_TOKEN;

  if (token) {
    try {
      const res: Response = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Authorization: `bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: QUERY, variables: { login } }),
        next: { revalidate: 3600, tags: [CONTRIBUTIONS_TAG] },
      });

      if (res.ok) {
        const json = await res.json();
        const calendar =
          json?.data?.user?.contributionsCollection?.contributionCalendar;
        if (calendar) {
          const weeks: ContributionDay[][] = calendar.weeks.map(
            (week: {
              contributionDays: {
                date: string;
                weekday: number;
                contributionCount: number;
                contributionLevel: string;
              }[];
            }) => {
              const days: ContributionDay[] = Array.from({ length: 7 }, () => ({
                date: "",
                count: 0,
                level: 0 as const,
              }));
              for (const day of week.contributionDays) {
                days[day.weekday] = {
                  date: day.date,
                  count: day.contributionCount,
                  level: LEVELS[day.contributionLevel] ?? 0,
                };
              }
              return days;
            }
          );

          return { total: calendar.totalContributions, weeks };
        }
      }
    } catch (err) {
      console.warn("[contributions] GraphQL fetch failed, trying public fallback:", err);
    }
  }

  // Fallback to public endpoint if GITHUB_TOKEN is not provided or fails
  return fetchPublicContributions(login);
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function monthLabels(weeks: ContributionDay[][]): (string | null)[] {
  let last = -1;
  return weeks.map((week, i) => {
    const first = week.find((day) => day.date);
    if (!first) return null;
    const month = new Date(first.date).getUTCMonth();
    if (month === last) return null;
    last = month;
    if (i === weeks.length - 1) return null;
    return MONTHS[month];
  });
}
