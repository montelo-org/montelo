import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

type TopCardProps = {
  title: string;
  content: FC;
};

export const TopCard: FC<TopCardProps> = ({ title, content: Content }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      {Content && (
        <CardContent className={"text-muted-foreground"}>
          <Content />
        </CardContent>
      )}
    </Card>
  );
};
