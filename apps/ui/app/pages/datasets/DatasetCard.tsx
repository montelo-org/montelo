import { DatasetDto } from "@montelo/browser-client";
import { useFetcher, useNavigate, useParams } from "@remix-run/react";
import { MoreHorizontal, Trash } from "lucide-react";
import { FC, MouseEventHandler, useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Routes } from "~/routes";

export const DatasetCard: FC<{ dataset: DatasetDto }> = ({ dataset }) => {
  const [isHovering, setIsHovering] = useState(false);
  const params = useParams();
  const fetcher = useFetcher();
  const navigate = useNavigate();

  const handleDeleteDataset: MouseEventHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    fetcher.submit(null, {
      method: "DELETE",
      action: Routes.actions.dataset.delete({
        projectId: params.projectId!,
        datasetId: dataset.id,
      }),
    });
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
    <Card className={`${isHovering ? "" : "hover:border-primary"} hover:cursor-pointer`} onClick={handleCardClick}>
      <CardHeader>
        <CardTitle>{dataset.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{dataset.description}</p>
        <p>Slug {dataset.slug}</p>
      </CardContent>
      <CardFooter className={"z-10 justify-end"}>
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <Button variant="ghost">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-44">
            <DropdownMenuItem className={"text-destructive gap-2"} onClick={handleDeleteDataset}>
              <Trash size={16} /> Delete Dataset
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
};
