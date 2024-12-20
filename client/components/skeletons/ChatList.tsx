import { Skeleton } from "@/components/ui/skeleton";
import { memo } from "react";

interface ChatListSkeletonProps {
   itemCount?: number;
}

const ChatListSkeletonItem = memo(() => (
   <div className="flex items-center space-x-4 p-2 bg-gray-800/50 rounded-lg animate-pulse">
      <Skeleton className="h-10 w-10 rounded-full bg-gray-700" />
      <div className="space-y-2 flex-1">
         <Skeleton className="h-4 w-3/4 bg-gray-700" />
         <Skeleton className="h-3 w-1/2 bg-gray-700" />
      </div>
   </div>
));

ChatListSkeletonItem.displayName = "ChatListSkeletonItem";

const ChatListSkeleton = ({ itemCount = 5 }: ChatListSkeletonProps) => {
   return (
      <div className="space-y-3">
         {Array.from({ length: itemCount }).map((_, index) => (
            <ChatListSkeletonItem key={index} />
         ))}
      </div>
   );
};

export default memo(ChatListSkeleton);
