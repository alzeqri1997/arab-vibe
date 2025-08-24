import { z } from "zod";
import Sandbox from "@e2b/code-interpreter";
import {
  createAgent,
  createNetwork,
  createTool,
  openai,
  type Tool,
} from "@inngest/agent-kit";

import { PROMPT } from "./prompt";
import { inngest } from "./client";
import { getSandbox, lastAssistantTextMessageContent } from "./utils";
import prisma from "@/lib/prisma";

interface AgentState {
  summary: string;
  files: { [path: string]: string };
}

export const codeAgentFunction = inngest.createFunction(
  { id: "code-agent" },
  { event: "code-agent/run" },
  async ({ event, step }) => {
    const sandboxId = await step.run("get-sandbox-id", async () => {
      const sandbox = await Sandbox.create("yjwnm2zu3bj6qbkbck3z");

      return sandbox.sandboxId;
    });

    const codeAgent = createAgent<AgentState>({
      name: "Coding Agent",
      description:
        "An expert coding agent working in a sandboxed Next.js environment",
      system: PROMPT,
      model: openai({
        model: "gpt-4o",
        defaultParameters: {
          temperature: 0.1,
        },
      }),
      tools: [
        createTool({
          name: "terminal",
          description: "Run a command in the terminal",
          parameters: z.object({ command: z.string() }),
          handler: async ({ command }, { step }) => {
            return await step?.run("terminal", async () => {
              const buffers = { stdout: "", stderr: "" };

              try {
                const sandbox = await getSandbox(sandboxId);
                const result = await sandbox.commands.run(command, {
                  onStderr: (data: string) => {
                    buffers.stderr += data;
                  },
                  onStdout: (data: string) => {
                    buffers.stdout += data;
                  },
                });
                return result.stdout;
              } catch (error) {
                const errorMessage = `Command failed: ${error} \nstdout ${buffers.stdout} \nstderr ${buffers.stderr}`;
                console.error(errorMessage);
                return errorMessage;
              }
            });
          },
        }),
        createTool({
          name: "createOrUpdateFiles",
          description: "Create or update files in the sandbox",
          parameters: z.object({
            files: z.array(
              z.object({
                path: z.string(),
                content: z.string(),
              })
            ),
          }),
          //todo: find a solution for asserting the type 
          // handler: async ({ files }, { step, network } : Tool.Options<AgentState> ) => {
          handler: async ({ files }, { step, network } ) => {
            const newFiles = await step?.run(
              "createOrUpdateFiles",
              async () => {
                console.log(
                  "createOrUpdateFiles <",
                  files.map((f: { path: string }) => f.path)
                );
                try {
                  const updatedFiles = network.state.data.files || {};
                  const sandbox = await getSandbox(sandboxId);
                  for (const file of files) {
                    await sandbox.files.write(file.path, file.content);
                    updatedFiles[file.path] = file.content;
                  }
                  return updatedFiles;
                } catch (error) {
                  return "Error updating files: " + error;
                }
              }
            );

            if (typeof newFiles === "object") {
              // Todo: Fix this type error later on
              network.state.data.files = newFiles;
            }
          },
        }),
        createTool({
          name: "readFiles",
          description: "Read files from the sandbox",
          parameters: z.object({
            files: z.array(z.string()),
          }),
          handler: async ({ files }, { step }) => {
            console.log("readFiles <", files);
            return await step?.run("readFiles", async () => {
              try {
                const sandbox = await getSandbox(sandboxId);
                const contents = [];
                for (const file of files) {
                  const content = await sandbox.files.read(file);
                  contents.push({ path: file, content });
                }
                return JSON.stringify(contents);
              } catch (error) {
                return "Error reading files: " + error;
              }
            });
          },
        }),
      ],
      lifecycle: {
        onResponse: async ({ result, network }) => {
          const lastAssistantMessageText =
            lastAssistantTextMessageContent(result);

          if (lastAssistantMessageText && network) {
            if (lastAssistantMessageText.includes("<task_summary>")) {
              network.state.data.summary = lastAssistantMessageText;
            }
          }

          return result;
        },
      },
    });

    const network = createNetwork<AgentState>({
      name: "coding-agent-network",
      agents: [codeAgent],
      maxIter: 15,
      router: async ({ network }) => {
        const summary = network.state.data.summary;

        if (summary) {
          return;
        }

        return codeAgent;
      },
    });

    const result = await network.run(event.data.value);

    const isError =
      !result.state.data.summary ||
      Object.keys(result.state.data.files || {}).length === 0;

    const sandboxUrl = await step.run("get-sandbox-url", async () => {
      const sandbox = await getSandbox(sandboxId);
      const host = sandbox.getHost(3000);

      return `https://${host}`;
    });

    await step.run("save-result", async () => {
      if (isError) {
        return await prisma.message.create({
          data: {
            projectId: event.data.projectId,
            content: "Something went wrong. Please try again.",
            role: "ASSISTANT",
            type: "ERROR",
          },
        });
      }

      return await prisma.message.create({
        data: {
          projectId: event.data.projectId,
          content: result.state.data.summary,
          role: "ASSISTANT",
          type: "RESULT",
          fragment: {
            create: {
              sandboxUrl: sandboxUrl,
              title: "Fragment",
              files: result.state.data.files,
            },
          },
        },
      });
    });

    return {
      url: sandboxUrl,
      title: "Fragment",
      files: result.state.data.files,
      summary: result.state.data.summary,
    };
  }
);
