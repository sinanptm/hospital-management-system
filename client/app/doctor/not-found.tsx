"use client";

import { Button } from "@/components/ui/button";
import useRedirect from "@/lib/hooks/useRedirect";

export default function NotFound() {
   const redirect = useRedirect();

   return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b ">
         <div className="text-center">
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
            <p className="text-xl mb-8">Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
            <Button
               onClick={() => redirect("/doctor")}
               className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
            >
               Go Home
            </Button>
         </div>
      </div>
   );
}
