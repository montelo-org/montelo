import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";
import { cn } from "~/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary hover:opacity-80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary hover:opacity-80",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive hover:opacity-80",
        outline: "text-foreground",
        white: "border-transparent bg-neutral-300 text-black shadow hover:bg-neutral-300 hover:opacity-80",
        rose: "border-transparent bg-rose-500 text-primary-foreground shadow hover:bg-rose-500 hover:opacity-80",
        pink: "border-transparent bg-pink-500 text-primary-foreground shadow hover:bg-pink-500 hover:opacity-80",
        fuchsia: "border-transparent bg-fuchsia-500 text-primary-foreground shadow hover:bg-fuchsia-500 hover:opacity-80",
        purple: "border-transparent bg-purple-500 text-primary-foreground shadow hover:bg-purple-500 hover:opacity-80",
        violet: "border-transparent bg-violet-500 text-primary-foreground shadow hover:bg-violet-500 hover:opacity-80",
        indigo: "border-transparent bg-indigo-500 text-primary-foreground shadow hover:bg-indigo-500 hover:opacity-80",
        blue: "border-transparent bg-blue-500 text-primary-foreground shadow hover:bg-blue-500 hover:opacity-80",
        sky: "border-transparent bg-sky-500 text-primary-foreground shadow hover:bg-sky-500 hover:opacity-80",
        cyan: "border-transparent bg-cyan-500 text-primary-foreground shadow hover:bg-cyan-500 hover:opacity-80",
        teal: "border-transparent bg-teal-500 text-primary-foreground shadow hover:bg-teal-500 hover:opacity-80",
        emerald: "border-transparent bg-emerald-500 text-primary-foreground shadow hover:bg-emerald-500 hover:opacity-80",
        green: "border-transparent bg-green-500 text-primary-foreground shadow hover:bg-green-500 hover:opacity-80",
        lime: "border-transparent bg-lime-500 text-primary-foreground shadow hover:bg-lime-500 hover:opacity-80",
        yellow: "border-transparent bg-yellow-500 text-primary-foreground shadow hover:bg-yellow-500 hover:opacity-80",
        amber: "border-transparent bg-amber-500 text-primary-foreground shadow hover:bg-amber-500 hover:opacity-80",
        orange: "border-transparent bg-orange-500 text-primary-foreground shadow hover:bg-orange-500 hover:opacity-80",
        red: "border-transparent bg-red-500 text-primary-foreground shadow hover:bg-red-500 hover:opacity-80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
