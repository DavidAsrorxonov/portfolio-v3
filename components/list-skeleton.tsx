import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type ListSkeletonProps = {
  count?: number;
  showIcon?: boolean;
  label?: string;
  className?: string;
};

export function ListSkeleton({
  count = 2,
  showIcon = true,
  label = "Loading content",
  className,
}: ListSkeletonProps) {
  return (
    <div role="status" aria-label={label} className={className}>
      <div aria-hidden="true">
        {Array.from({ length: count }, (_, index) => (
          <div key={index}>
            <div className="flex gap-3 py-3">
              {showIcon && (
                <Skeleton className="mt-1 size-3.5 shrink-0 rounded-sm" />
              )}
              <div className="flex h-5 flex-1 items-center">
                <Skeleton
                  className={cn(
                    "h-3 rounded-sm",
                    index % 2 === 0 ? "w-4/5" : "w-3/5",
                  )}
                />
              </div>
            </div>
            {index < count - 1 ? <Separator /> : null}
          </div>
        ))}
      </div>
    </div>
  );
}
