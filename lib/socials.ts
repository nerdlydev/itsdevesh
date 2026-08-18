// Single source of truth for socials — consumed by the homepage and /api/contacts.
export type Social = {
  medium: string;
  username: string;
  link: string;
};

export const socials: Social[] = [
  {
    medium: "GitHub",
    username: "nerdlydev",
    link: "https://github.com/nerdlydev",
  },
  {
    medium: "X",
    username: "nerdlyDev",
    link: "https://x.com/nerdlyDev",
  },
  {
    medium: "LinkedIn",
    username: "deveshs1",
    link: "https://www.linkedin.com/in/deveshs1/",
  },
  {
    medium: "Instagram",
    username: "itsokaydevesh",
    link: "https://www.instagram.com/itsokaydevesh/",
  },
  {
    medium: "Email",
    username: "deveshsharma070701@gmail.com",
    link: "mailto:deveshsharma070701@gmail.com",
  },
];

