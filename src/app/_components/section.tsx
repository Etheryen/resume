import { type ReactNode } from "react";
import { cn } from "~/utils/cn";

interface SectionProps {
  title: string;
  children: ReactNode;
  icon: ReactNode;
  className?: string;
}

export default function Section({
  title,
  icon,
  children,
  className,
}: SectionProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      <div className="flex items-center gap-2 pb-2 text-2xl font-bold">
        {icon}
        <span>{title}</span>
      </div>
      {children}
    </div>
  );
}
