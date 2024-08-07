export const TABS = {
  SIGNUPS: "signups",
  KNOWHOWS: "knowhows",
  VOTES: "votes",
  COMMENTS: "comments"
} as const;

export type TTabType = (typeof TABS)[keyof typeof TABS];
