import { Clipboard, ClipboardCheck } from "lucide-react";
import { FC } from "react";
import { CodeBlock } from "~/components/traces/MessagesView/CodeBlock";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { useCopyToClipboard } from "~/hooks";

export const DatasetSchemaDialog: FC<{ slug: string; inputSchema: object; outputSchema: object }> = ({
  slug,
  inputSchema,
  outputSchema,
}) => {
  const [copied, copyToClipboard] = useCopyToClipboard();

  const generateTypeDefinition = (obj: object, varName: string): string => {
    const entries = Object.entries(obj);
    const typeProperties = entries.map(([key, value]) => {
      let tsType: string;
      switch (value) {
        case "string":
          tsType = "string";
          break;
        case "number":
          tsType = "number";
          break;
        case "boolean":
          tsType = "boolean";
          break;
        case "object":
          tsType = "Record<string, any>";
          break;
        case "array":
          tsType = "any[]";
          break;
        default:
          throw new Error(`Invalid input type: ${value}`);
      }
      return `${key}: ${tsType};`;
    });

    return `export type ${varName} = {\n  ${typeProperties.join("\n  ")}\n};`;
  };

  const sampleCode = `
const localDataset: Array<{ input: DatasetInput; expectedOutput: DatasetOutput }> = [...];  

for (const { input, expectedOutput } of localDataset) {
  await montelo.datapoints.create({
    dataset: "${slug}",
    input,
    expectedOutput,
  });
}

await montelo.experiments.createAndRun({
  name: "Experiment Name",
  description: "Experiment Description",
  dataset: "${slug}",
  runner: (input: DatasetInput) => DatasetOutput,
});
  `;

  const inputTypeDefinition = generateTypeDefinition(inputSchema, "DatesetInput");
  const outputTypeDefinition = generateTypeDefinition(outputSchema, "DatesetOutput");
  const combinedTypeDefinition = `${inputTypeDefinition}\n\n${outputTypeDefinition}\n\n${sampleCode}`;

  const isCopied = copied.value === combinedTypeDefinition;
  const Icon = isCopied ? ClipboardCheck : Clipboard;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>View Code</Button>
      </DialogTrigger>
      <DialogContent className={"max-h-[750px] max-w-[52rem] overflow-y-scroll"}>
        <DialogHeader>
          <DialogTitle>Dataset Schemas</DialogTitle>
        </DialogHeader>
        <div className={"flex flex-col gap-8"}>
          {/*<div className="grid grid-cols-2 gap-8">*/}
          {/*  <div>*/}
          {/*    <p className={"mb-2 font-medium"}>Input Schema</p>*/}
          {/*    <CodeBlock value={JSON.stringify(inputSchema, undefined, 2)} />*/}
          {/*  </div>*/}
          {/*  <div>*/}
          {/*    <p className={"mb-2 font-medium"}>Output Schema</p>*/}
          {/*    <CodeBlock value={JSON.stringify(outputSchema, undefined, 2)} />*/}
          {/*  </div>*/}
          {/*</div>*/}
          <div className={"flex flex-col gap-2"}>
            <p className={"text-lg font-medium"}>TypeScript Code</p>
            <p>Copy the following TypeScript code to upload datapoints and run experiments against this dataset.</p>
            <CodeBlock value={combinedTypeDefinition} />
            <Icon
              className={"text-muted-foreground hover:text-foreground fixed right-1 mr-10 mt-20 cursor-pointer"}
              onClick={() => {
                copyToClipboard(combinedTypeDefinition);
              }}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
