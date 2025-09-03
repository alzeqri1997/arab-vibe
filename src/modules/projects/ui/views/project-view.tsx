"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";

interface Props {
  projectId: string;
}

const ProjectView = ({ projectId }: Props) => {
  const trpc = useTRPC();
  const { data: project } = useSuspenseQuery(
    trpc.projects.getOne.queryOptions({
      id: projectId,
    })
  );

  const { data: messages } = useSuspenseQuery(
    trpc.messages.getMany.queryOptions({
      projectId
    })
  );

  return (
    <div>
      {JSON.stringify(project)}
      <br />
      <br />
      {JSON.stringify(messages, null, 2)}
    </div>
  )
};

export default ProjectView;
