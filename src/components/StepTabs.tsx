import { cn } from "@/lib/utils";

interface Step {
  number: number;
  label: string;
  status?: "active" | "completed" | "locked";
}

interface StepTabsProps {
  steps: Step[];
  currentStep: number;
}

const StepTabs = ({ steps, currentStep }: StepTabsProps) => {
  return (
    <div className="flex gap-3 mb-8">
      {steps.map((step) => (
        <button
          key={step.number}
          className={cn(
            "flex-1 px-6 py-4 rounded-xl font-medium transition-all relative",
            step.number === currentStep
              ? "bg-secondary text-foreground border-2 border-primary shadow-soft"
              : "bg-card text-muted-foreground border border-border hover:bg-secondary/50"
          )}
        >
          <div className="flex items-center gap-2">
            <span className="text-sm">
              Step {step.number}: {step.label}
            </span>
          </div>
          {step.status === "locked" && (
            <span className="absolute top-2 right-2 px-2 py-0.5 bg-accent text-accent-foreground text-xs rounded-md font-semibold">
              Requires 7.0
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default StepTabs;
