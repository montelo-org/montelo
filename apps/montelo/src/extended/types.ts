import { omit, pick } from "lodash";

export type MonteloLogExtend = {
  /**
   * [Montelo] A name for the log.
   *
   */
  name: string;
  /**
   * [Montelo] An object with extra properties.
   *
   */
  extra?: Record<string, any>;
};

export const separateExtend = <T extends MonteloLogExtend>(
  input: T,
): {
  base: Omit<T, keyof MonteloLogExtend>;
  extend: MonteloLogExtend;
} => {
  // when `MonteloLogExtend` is updated, also update the keys
  const keys = ["name", "extra"] as const;
  const extend: MonteloLogExtend = pick(input, keys);
  const base: Omit<T, keyof MonteloLogExtend> = omit(input, keys);
  return { base, extend };
};
