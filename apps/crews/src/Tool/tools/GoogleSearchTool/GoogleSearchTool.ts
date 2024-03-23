import { getJson } from "serpapi";
import { z } from "zod";
import { Tool } from "../../Tool";
import { formatObject } from "./GoogleSearchTool.utils";

/**
 * Input schema
 */
const SearchInput = z.object({
  query: z
    .string()
    .describe(
      "The query you want to search for. You can use anything that you would use in a regular Google search. e.g. inurl: or site: or intitle:",
    ),
});
type TSearchInput = z.infer<typeof SearchInput>;

/**
 * Function
 */
const googleSearch = async ({ query }: TSearchInput): Promise<string> => {
  const result = await getJson({
    engine: "google",
    api_key: process.env.SERP_API_KEY,
    q: query,
  });
  if (!result.organic_results) {
    throw new Error("No organic results found");
  }

  const formattedResults = result.organic_results
    .slice(0, 5)
    .map((data: any) => formatObject(data, ["title", "link", "snippet"]))
    .join("\n\n");

  return formattedResults;
};

/**
 * Tool Definition
 */
export const GoogleSearchTool = new Tool({
  name: "GoogleSearch",
  function: googleSearch,
  description: "This tool allows you to scrape the results from a Google search.",
  schema: SearchInput,
});
