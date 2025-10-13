import MessageForm from "@/modules/projects/ui/components/message-form";
import { Skeleton } from "./ui/skeleton";

function ProjectHeaderSkeleton() {
  return (
    <header className="p-2 pl-4 h-[48.8px] flex justify-between items-center border-b">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-[18px] w-[18px] rounded-full" />
        <div>
          <Skeleton className="h-3 w-[200px]" />
        </div>
      </div>
    </header>
  );
}

function MessageContainerSkeleton() {
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="pt-10 pr-1">
          <div className="flex flex-col group px-2 pb-4">
            <div className="flex items-start gap-2 pl-2 mb-8">
              <Skeleton className="h-[28px] w-[28px] rounded-full" />
              <div className="space-y-2">
                <Skeleton className="w-[200px] h-4 mt-1" />
                <div className="mt-5 space-y-2">
                  <Skeleton className="w-[400px] h-5" />
                  <Skeleton className="w-[400px] h-5" />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 pl-2 mb-2">
              <Skeleton className="w-[400px] h-5" />
            </div>
          </div>
        </div>
      </div>
      <div className="relative p-3 pt-1">
        <div className="absolute -top-6 left-0 h-6 bg-gradient-to-b from-transparent to-background pointer-events-none w-full " />
        <MessageForm projectId={""} />
      </div>
    </div>
  );
}

export { ProjectHeaderSkeleton, MessageContainerSkeleton };
