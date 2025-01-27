"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import ChatLayoutSkeleton from "@/components/skeletons/ChatSkelton";
import NotAuthenticated from "./NotAuthenticated";

export default function ChatLayout({
   chatList,
   chat,
   isPatient,
}: {
   chatList: ReactNode;
   chat: ReactNode;
   isPatient: boolean;
}) {
   const pathname = usePathname();
   const [isLoading, setLoading] = useState(true);
   const [isInChatView, setIsInChatView] = useState(false);
   const { patientToken } = useAuth();

   useEffect(() => {
      setIsInChatView(pathname.includes("/chats/"));
   }, [pathname]);

   useEffect(() => {
      if (isPatient) {
         const timer = setTimeout(() => {
            setLoading(false);
         }, 0);
         return () => clearTimeout(timer);
      } else {
         setLoading(false);
      }
   }, [isPatient]);

   if (isLoading) {
      return <ChatLayoutSkeleton />;
   }

   if (isPatient && !!!patientToken) {
      return <NotAuthenticated />;
   }

   return (
      <div
         className={`flex flex-col sm:flex-row h-[calc(100vh-4rem)] ${!isPatient ? "border border-border border-r m-0" : ""}`}
      >
         <aside
            className={`${
               isInChatView ? "hidden sm:block" : "block"
            } w-full sm:w-64 md:w-80 border-r border-border overflow-hidden flex-shrink-0`}
         >
            {chatList || <div className="p-4">Loading chat list...</div>}
         </aside>
         <main className={`${isInChatView ? "block" : "hidden sm:block"} flex-1 overflow-hidden`}>
            {chat || (
               <div className="h-full flex items-center justify-center text-center p-4">
                  <div>
                     <h2 className="text-xl font-bold mb-2">Welcome to Your Messages</h2>
                     <p className="text-sm text-muted-foreground">
                        Select a chat to start messaging or create a new one.
                     </p>
                  </div>
               </div>
            )}
         </main>
      </div>
   );
}
