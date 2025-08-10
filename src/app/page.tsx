"use client"

import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export default function Home() {
  const [value, setValue] = useState<string>("")
  const trpc = useTRPC()
  const invoke = useMutation(trpc.invoke.mutationOptions({
    onSuccess: () => { 
      alert("Function invoked successfully!")
    }
  }))
  return (
    <div>
      <input
        type="text"
        placeholder="Enter text"
        className="border rounded-lg px-4 py-2"
        onChange={(e) => setValue(e.target.value)}
      />
      <button className="bg-white text-black rounded-lg px-4 py-2 mt-4" onClick={() => invoke.mutate({ text: value })}>
        Invoke Function
      </button>
    </div>
  );
}
