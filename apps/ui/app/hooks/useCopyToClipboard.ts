import writeText from "copy-to-clipboard";
import { useCallback } from "react";

import { useMountedState } from "./useMountedState";
import { useSetState } from "./useSetState";

export interface CopyToClipboardState {
  value?: string;
  noUserInteraction: boolean;
  error?: Error;
}

export const useCopyToClipboard = (): [CopyToClipboardState, (value: string) => void] => {
  const isMounted = useMountedState();
  const [state, setState] = useSetState<CopyToClipboardState>({
    value: undefined,
    error: undefined,
    noUserInteraction: true,
  });

  const copyToClipboard = useCallback((value: string | number) => {
    if (!isMounted()) {
      return;
    }
    let noUserInteraction;
    let normalizedValue;
    try {
      // only strings and numbers casted to strings can be copied to clipboard
      if (typeof value !== "string" && typeof value !== "number") {
        const error = new Error(`Cannot copy typeof ${typeof value} to clipboard, must be a string`);
        if (process.env.NODE_ENV === "development") console.error(error);
        setState({
          value,
          error,
          noUserInteraction: true,
        });
        return;
      }
      // empty strings are also considered invalid
      else if (value === "") {
        const error = new Error(`Cannot copy empty string to clipboard.`);
        if (process.env.NODE_ENV === "development") console.error(error);
        setState({
          value,
          error,
          noUserInteraction: true,
        });
        return;
      }
      normalizedValue = value.toString();
      noUserInteraction = writeText(normalizedValue);
      setState({
        value: normalizedValue,
        error: undefined,
        noUserInteraction,
      });
    } catch (error: any) {
      setState({
        value: normalizedValue,
        error,
        noUserInteraction,
      });
    }
  }, []);

  return [state, copyToClipboard];
};
