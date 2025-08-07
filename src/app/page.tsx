"use client"

import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";

export default function Home() {
  const trpc = useTRPC()
  const invoke = useMutation(trpc.invoke.mutationOptions({
    onSuccess: () => { 
      alert("Function invoked successfully!")
    }
  }))
  return (
    <div>
      <button className="bg-white text-black rounded-lg px-4 py-2 mt-4" onClick={() => invoke.mutate({ text: "Ahmed" })}>
        Invoke Function
      </button>
    </div>
  );
}
