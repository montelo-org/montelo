import { FC } from "react";
import { CodeBlock } from "~/components/traces/MessagesView/CodeBlock";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

export const DatasetSchemaDialog: FC<{ inputSchema: object; outputSchema: object }> = ({
  inputSchema,
  outputSchema,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>View Schema</Button>
      </DialogTrigger>
      <DialogContent className={"max-w-[48rem]"}>
        <DialogHeader>
          <DialogTitle>Dataset Schemas</DialogTitle>
          <DialogDescription>The input and output schemas ...</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <p className={"mb-2 font-medium"}>Input</p>
            <CodeBlock value={JSON.stringify(inputSchema, undefined, 2)} />
          </div>
          <div>
            <p className={"mb-2 font-medium"}>Output</p>
            <CodeBlock value={JSON.stringify(outputSchema, undefined, 2)} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
