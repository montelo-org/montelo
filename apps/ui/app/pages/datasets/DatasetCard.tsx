import { DatasetDto } from "@montelo/browser-client";
import { useFetcher, useNavigate, useParams } from "@remix-run/react";
import { MoreHorizontal, Trash } from "lucide-react";
import { FC, MouseEventHandler } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Routes } from "~/routes";

export const DatasetCard: FC<{ dataset: DatasetDto }> = ({ dataset }) => {
  const params = useParams();
  const fetcher = useFetcher();
  const navigate = useNavigate();

  const handleDeleteDataset: MouseEventHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    fetcher.submit({ datasetId: dataset.id }, { method: "post", action: Routes.actions.dataset.delete });
  };

  const handleCardClick = () => {
    const path = {
      projectId: params.projectId!,
      envId: dataset.envId,
      datasetId: dataset.id,
    };
    navigate(Routes.app.project.env.datasetsId(path));
  };

  return (
    <Card className={"hover:bg-muted/50 hover:cursor-pointer"} onClick={handleCardClick}>
      <CardHeader>
        <CardTitle>{dataset.name}</CardTitle>
        <CardDescription>
          <span className={"font-medium"}>Slug {dataset.slug}</span>
        </CardDescription>
      </CardHeader>
      <CardFooter className={"z-10 justify-end"}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-44">
            <DropdownMenuItem className={"gap-2 text-red-600"} onClick={handleDeleteDataset}>
              <Trash size={16} /> Delete Dataset
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
};
