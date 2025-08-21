"use client"
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { useTRPC } from "@/trpc/client";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [value, setValue] = useState<string>("")
  const trpc = useTRPC()
  const {data: messages} = useQuery(trpc.messages.getMany.queryOptions())
  const createMessage = useMutation(trpc.messages.create.mutationOptions({
    onSuccess: () => { 
      alert("Message created")
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
      <Button
        className="bg-white text-black rounded-lg px-4 py-2 mt-4"
        onClick={() => createMessage.mutate({value})}
      >
        Invoke Function
      </Button>
      <br />
      <br />
      <br />

      {JSON.stringify(messages)}
    </div>
  );
}
