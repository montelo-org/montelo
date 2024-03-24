export type MonteloLogExtend = {
  /**
   * [Montelo] A name for the log.
   *
   */
  name?: string;
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
  const { name, extra, ...rest } = input;
  const extend: MonteloLogExtend = { name, extra };
  const base: Omit<T, keyof MonteloLogExtend> = rest;
  return { base, extend };
};
