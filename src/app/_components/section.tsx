import { type ReactNode } from "react";

interface SectionProps {
  title: string;
  children: ReactNode;
  icon: ReactNode;
}

export default function Section({ title, children, icon }: SectionProps) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 pb-2 text-2xl font-bold">
        {icon}
        <span>{title}</span>
      </div>
      {children}
    </div>
  );
}
