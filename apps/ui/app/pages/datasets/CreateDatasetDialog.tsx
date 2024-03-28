import { FC } from "react";
import { DialogContent, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import { CreateDatasetForm } from "~/pages/datasets/forms/CreateDatasetForm";

export const CreateDatasetDialog: FC<{ isDialogOpen: boolean; setIsDialogOpen: any }> = ({
  isDialogOpen,
  setIsDialogOpen,
}) => {
  return (
    <DialogContent className="min-w-[600px]">
      <DialogHeader>
        <DialogTitle>Create Dataset</DialogTitle>
      </DialogHeader>
      <CreateDatasetForm isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
    </DialogContent>
  );
};
