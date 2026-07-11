import type { Metadata } from "next";

export const SITE_URL = "https://www.yashagrawal.me";
export const SITE_NAME = "Yash Agrawal Portfolio";
export const AUTHOR_NAME = "Yash Agrawal";
export const TWITTER_CREATOR = "@Yash__Sensei";
export const PERSON_ID = `${SITE_URL}/#person`;

export const DEFAULT_OG_IMAGE = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "Yash Agrawal - Full Stack Developer & Growth Operator",
};

export const INDEXABLE_ROBOTS: Metadata["robots"] = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
};
