import { cn } from "@/lib/utils";
import { Gloria_Hallelujah } from "next/font/google";
const fontGloria = Gloria_Hallelujah({
  weight: "400",
  display: "swap",
  subsets: ["latin"],
});

interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-4 items-center justify-center">
      <h1 className={cn("text-4xl font-normal", fontGloria.className)}>
        Auth v5
      </h1>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};
