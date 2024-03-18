import { DatasetDto } from "@montelo/browser-client";
import { useFetcher } from "@remix-run/react";
import { MoreHorizontal, Trash } from "lucide-react";
import { FC } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";
import { Routes } from "~/routes";


export const DatasetCard: FC<{ dataset: DatasetDto }> = ({ dataset }) => {
  const fetcher = useFetcher();

  const handleDeleteDataset = () => {
    fetcher.submit({ datasetId: dataset.id }, { method: "post", action: Routes.actions.dataset.delete });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{dataset.name}</CardTitle>
        <CardDescription>
          <span className={"font-medium"}>Slug {dataset.slug}</span>
        </CardDescription>
      </CardHeader>
      <CardFooter className={"justify-end"}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem className={"gap-2 text-red-600"} onClick={handleDeleteDataset}>
              <Trash size={16} /> Delete Dataset
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
};