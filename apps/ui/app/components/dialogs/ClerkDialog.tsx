import React, { ReactNode, useEffect, useRef } from "react";

type DialogProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

export const ClerkDialog: React.FC<DialogProps> = ({ children, isOpen, onClose }) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  // Close dialog when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0, 0, 0, 0.8)" }}>
      <div
        ref={dialogRef}
        style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
      >
        {children}
      </div>
    </div>
  );
};
