import { basename, relative } from "path";

export const getRelativePath = (from: string, to: string): string => {
  // Get the relative path
  let relativePath = relative(from, to);

  // Replace backslashes with forward slashes for cross-platform compatibility
  relativePath = relativePath.replace(/\\/g, "/");

  // Ensure the path starts with './' if it's not already an absolute or relative path
  if (!relativePath.startsWith(".") && !relativePath.startsWith("/")) {
    relativePath = "./" + relativePath;
  }

  return relativePath;
};

export const getBaseNameWithoutExtension = (filename: string): string => {
  const baseFilename = basename(filename);
  return baseFilename.split(".")[0];
};
