import { Form, useRevalidator } from "@remix-run/react";
import React, { FormEventHandler } from "react";
import { Routes } from "~/routes";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";

type NewProjectDialogProps = {
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  projectName: string;
  projectId: string;
};

export const DeleteProjectConfirmDialog = ({
  projectName,
  projectId,
  isDialogOpen,
  setIsDialogOpen,
}: NewProjectDialogProps) => {
  const revalidator = useRevalidator();

  // NOTE: turn this into useFetcher
  const handleDelete: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    formData.append("projectId", projectId);

    await fetch(Routes.actions.project.delete, {
      method: "POST",
      body: formData,
    });
    revalidator.revalidate();

    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <Form method="post" action={Routes.actions.project.delete} onSubmit={handleDelete}>
          <DialogHeader>
            <DialogTitle>Delete Team {projectName}</DialogTitle>
          </DialogHeader>
          <div className={"my-4"}>
            Are you sure you want to delete the {projectName} team?
            <br />
            <span className={"font-bold"}>This is an irreversible action.</span>
          </div>
          <DialogFooter>
            <Button type="submit" variant={"destructive"}>
              Delete {projectName}
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
