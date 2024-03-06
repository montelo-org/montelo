import { BadgeProps } from "../../../components/ui/badge";

export const idShortener = (id: string): { short: string; variant: BadgeProps["variant"] } => {
  const short = id.substring(id.length - 4);

  const lastLetterAscii = id.charCodeAt(id.length - 1);
  const variants: Array<BadgeProps["variant"]> = [
    "pink",
    "rose",
    "fuchsia",
    "purple",
    "violet",
    "indigo",
    "blue",
    "sky",
    "cyan",
    "teal",
    "emerald",
    "green",
    "lime",
    "yellow",
    "amber",
    "orange",
    "red"
  ];

  const adjustedAsciiIndex = lastLetterAscii % variants.length;
  const variant = variants[adjustedAsciiIndex];

  return {
    short,
    variant,
  };
};
