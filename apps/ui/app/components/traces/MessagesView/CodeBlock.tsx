import { FC } from "react";

const RawHTML: FC<{ html: string }> = ({ html }) => {
  return (
    <pre
      className={"bg-secondary whitespace-pre-wrap rounded-xl px-8 py-4 text-sm"}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

type CodeBlockProps = {
  value: string;
};
export const CodeBlock: FC<CodeBlockProps> = ({ value }) => {
  function syntaxHighlight(json: string) {
    const nJson = json.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    return nJson.replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
      function (match) {
        let cls = "number";
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = "key";
          } else {
            cls = "string";
          }
        } else if (/true|false/.test(match)) {
          cls = "boolean";
        } else if (/null/.test(match)) {
          cls = "null";
        }
        return '<span class="' + cls + '">' + match + "</span>";
      },
    );
  }

  const syntaxHighlightedHTML = syntaxHighlight(value);

  return <RawHTML html={syntaxHighlightedHTML} />;
};
