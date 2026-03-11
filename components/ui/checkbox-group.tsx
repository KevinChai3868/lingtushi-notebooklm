import { Option } from "@/lib/types";
import { cn } from "@/lib/utils";

type CheckboxGroupProps = {
  options: Option[];
  values: string[];
  onToggle: (value: string) => void;
};

export function CheckboxGroup({ options, values, onToggle }: CheckboxGroupProps) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {options.map((option) => {
        const active = values.includes(option.value);
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onToggle(option.value)}
            className={cn(
              "rounded-2xl border px-3 py-3 text-left text-sm transition",
              active
                ? "border-primary bg-primary/10 text-foreground"
                : "border-border bg-white hover:border-primary/50"
            )}
          >
            <div className="font-semibold">{option.label}</div>
            {option.description ? <div className="mt-1 text-xs text-muted">{option.description}</div> : null}
          </button>
        );
      })}
    </div>
  );
}
