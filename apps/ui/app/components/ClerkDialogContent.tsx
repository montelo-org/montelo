import * as Dialog from "@radix-ui/react-dialog";
import { FC, ReactNode } from "react";

export const ClerkDialogContent: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0 backdrop-brightness-[0.2]" />
      <Dialog.Content className="data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] max-h-[85vh] translate-x-[-50%] translate-y-[-50%] rounded-[6px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none overflow-scroll">
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  );
};
