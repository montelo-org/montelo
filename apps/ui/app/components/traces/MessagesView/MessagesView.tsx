import { LogDtoSourceEnum } from "@montelo/browser-client";
import { FC, useState } from "react";
import { SourceToMessageMap } from "~/components/traces/MessagesView/SourceToMessageMap";
import { Container, MessageContainer, Title } from "~/components/traces/MessagesView/styles";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";
import { CodeBlock } from "./CodeBlock";


type MessagesViewProps = {
  input: any;
  output: any;
  extra: any;
  source: LogDtoSourceEnum;
};
export const MessagesView: FC<MessagesViewProps> = ({ input, output, extra, source }) => {
  const [jsonView, setJsonView] = useState(false);

  const { InputComponent, OutputComponent } = SourceToMessageMap[source];

  return (
    <MessageContainer>
      <div className="text-muted-foreground flex items-center justify-end space-x-2">
        <Switch id="json-view" checked={jsonView} onCheckedChange={setJsonView} />
        <Label htmlFor="json-view">{jsonView ? "Pretty" : "JSON"}</Label>
      </div>
      <MessageContainer>
        <Container>
          <InputComponent value={input} jsonView={jsonView} />
        </Container>
        <Container>
          <OutputComponent value={output} jsonView={jsonView} />
        </Container>
        <MessageContainer>
          <Title>Extra</Title>
          <CodeBlock value={JSON.stringify(extra || {}, undefined, 2)} />
        </MessageContainer>
      </MessageContainer>
    </MessageContainer>
  );
};
