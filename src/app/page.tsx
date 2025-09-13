"use client";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

import { useTRPC } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  const [value, setValue] = useState<string>("");

  const trpc = useTRPC();
  const createProject = useMutation(
    trpc.projects.create.mutationOptions({
      onError: (error) => {
        toast.error(error.message);
      },
      onSuccess: (data) => {
        router.push(`/projects/${data.id}`)
      }
    })
  );
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="max-w-screen mx-auto flex items-center flex-col gap-y-4 justify-center">
        <Input value={value} onChange={(e) => setValue(e.target.value)} />
        <Button
          onClick={() => createProject.mutate({ value: value })}
          disabled={createProject.isPending}
        >
          Submit
        </Button> 
      </div>
    </div>
  );
}
