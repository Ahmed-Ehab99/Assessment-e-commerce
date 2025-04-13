import { cn } from "@/lib/utils";

interface FeatuersCardProps {
  className: string;
  title: string;
  subTitle: string;
}

const FeatuersCard = ({ className, title, subTitle }: FeatuersCardProps) => {
  return (
    <div
      className={cn(className, "flex h-[476px] items-end rounded-2xl bg-cover bg-center bg-no-repeat p-6 shadow-2xl")}
    >
      <div className="flex h-1/2 flex-col items-center justify-center gap-6 rounded-2xl bg-white/70 p-6 text-center backdrop-blur-sm xl:p-11">
        <span className="text-base font-bold text-[#1e1e1e]">{title}</span>
        <p className="text-sm font-normal text-[#1e1e1e] opacity-80">
          {subTitle}
        </p>
      </div>
    </div>
  );
};

export default FeatuersCard;
