import { FC } from "react";
import type { Theme } from "react-base16-styling";
import { JSONTree } from "react-json-tree";

export const PrettyJson: FC<{ data: any }> = ({ data }) => {
  const theme: Theme = {
    base00: "transparent",
    base01: "#383830",
    base02: "#49483e",
    base03: "#75715e",
    base04: "#a59f85",
    base05: "#f8f8f2",
    base06: "#f5f4f1",
    base07: "#f9f8f5",
    base08: "var(--json-null)",
    base09: "var(--json-boolean)",
    base0A: "#f4bf75",
    base0B: "var(--json-string)",
    base0C: "var(--json-number)",
    base0D: "var(--json-key)",
    base0E: "#ae81ff",
    base0F: "#cc6633",
  };

  const valueRenderer = (raw: any) => {
    if (typeof raw === "string") {
      const maxLength = 50;
      const length = raw.length;
      return <em>{length >= maxLength ? `${raw.substring(0, maxLength)}...` : raw}</em>;
    }
    return <em>{raw}</em>;
  };

  return <JSONTree data={data} valueRenderer={valueRenderer} theme={theme} hideRoot={true} sortObjectKeys={true} />;
};
