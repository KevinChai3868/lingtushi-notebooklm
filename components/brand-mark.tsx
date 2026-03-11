import { cn } from "@/lib/utils";

type BrandMarkProps = {
  compact?: boolean;
  className?: string;
};

export function BrandMark({ compact = false, className }: BrandMarkProps) {
  if (compact) {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#0f5d73,#f0aa52)] shadow-[0_14px_28px_rgba(15,93,115,0.22)]">
          <div className="absolute inset-[3px] rounded-[14px] border border-white/25" />
          <span className="relative text-base font-black tracking-[0.28em] text-white">靈圖</span>
        </div>
        <div>
          <div className="text-lg font-black tracking-tight text-foreground">靈圖師</div>
          <div className="text-xs font-semibold tracking-[0.24em] text-muted">NOTEBOOKLM 提示工坊</div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-4", className)}>
      <div className="relative flex h-16 w-16 items-center justify-center rounded-[22px] bg-[linear-gradient(135deg,#0f5d73,#f0aa52)] shadow-[0_18px_36px_rgba(15,93,115,0.24)]">
        <div className="absolute inset-[4px] rounded-[18px] border border-white/25" />
        <span className="relative text-xl font-black tracking-[0.3em] text-white">靈圖</span>
      </div>
      <div>
        <div className="text-sm font-semibold tracking-[0.32em] text-white/72">VISUAL PROMPT STUDIO</div>
        <div className="text-3xl font-black tracking-tight text-white">靈圖師</div>
        <div className="text-base font-semibold tracking-[0.18em] text-white/88">NotebookLM 提示工坊</div>
      </div>
    </div>
  );
}
