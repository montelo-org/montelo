import { FC } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";

type TopCardProps = {
  title: string;
  description: FC;
  content?: FC;
};

export const TopCard: FC<TopCardProps> = ({ title, description: Description, content: Content }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          <Description />
        </CardDescription>
      </CardHeader>
      {Content && <CardContent>
        <Content />
      </CardContent>}
    </Card>
  );
};
