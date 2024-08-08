import { StaticImageData } from "next/image";
import signUpIcon from "/public/icons/signUp.svg";
import voteIcon from "/public/icons/vote.svg";
import knowhowIcon from "/public/icons/knowhow.svg";
import commentIcon from "/public/icons/comment.svg";

export const TABS = {
  SIGNUPS: "signups",
  KNOWHOWS: "knowhows",
  VOTES: "votes",
  COMMENTS: "comments"
} as const;

export const TAB_COLORS: Record<TTabType, string> = {
  [TABS.SIGNUPS]: "bg-green-400",
  [TABS.KNOWHOWS]: "bg-blue-400",
  [TABS.VOTES]: "bg-red-400",
  [TABS.COMMENTS]: "bg-yellow-400"
};

export const TAB_COLORS_SELECTED: Record<TTabType, string> = {
  [TABS.SIGNUPS]: "bg-green-600",
  [TABS.KNOWHOWS]: "bg-blue-600",
  [TABS.VOTES]: "bg-red-600",
  [TABS.COMMENTS]: "bg-yellow-600"
};

export const TAB_ICONS: Record<TTabType, StaticImageData> = {
  [TABS.SIGNUPS]: signUpIcon,
  [TABS.KNOWHOWS]: knowhowIcon,
  [TABS.VOTES]: voteIcon,
  [TABS.COMMENTS]: commentIcon
};

export const TAB_DESCRIPTIONS: Record<TTabType, string> = {
  [TABS.SIGNUPS]: "오늘 가입한 회원 수",
  [TABS.KNOWHOWS]: "오늘 작성된 짠 노하우 게시글 수",
  [TABS.VOTES]: "오늘 작성된 짠 소비 게시글 수",
  [TABS.COMMENTS]: "오늘 작성된 댓글 수"
};

export type TTabType = (typeof TABS)[keyof typeof TABS];
