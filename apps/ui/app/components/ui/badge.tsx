import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
        purple: "border-transparent bg-purple text-purple-foreground shadow hover:bg-purple/80",
        blue: "border-transparent bg-blue text-blue-foreground shadow hover:bg-blue/80",
        orange: "border-transparent bg-orange text-orange-foreground shadow hover:bg-orange/80",
        green: "border-transparent bg-green text-green-foreground shadow hover:bg-green/80",
        red: "border-transparent bg-red text-red-foreground shadow hover:bg-red/80",
        yellow: "border-transparent bg-yellow text-yellow-foreground shadow hover:bg-yellow/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
