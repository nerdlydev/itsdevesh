// Places I've been written about — as opposed to /writing, which is what I wrote.
// Homepage section for now; lift into app/elsewhere/page.tsx once this grows past ~5.
export type Mention = {
  title: string;
  publisher: string;
  date: string;
  link: string;
  note: string;
  quote?: string;
};

export const mentions: Mention[] = [
  // Add press mentions, features, and external write-ups here.
];
