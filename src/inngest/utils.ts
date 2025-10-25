import { Sandbox } from "@e2b/code-interpreter";
import {
  AgentResult,
  createAgent,
  openai,
  TextMessage,
} from "@inngest/agent-kit";
import { SANDBOX_TIMEOUT } from "./types";
import { TITLE_PROMPT } from "./prompt";
import { parseAgentOutput } from "@/lib/utils";

export async function getSandbox(sandboxId: string) {
  const sandbox = await Sandbox.connect(sandboxId);
  await sandbox.setTimeout(SANDBOX_TIMEOUT);
  return sandbox;
}

export function lastAssistantTextMessageContent(result: AgentResult) {
  const lastAssistantTextMessage = result.output.findLastIndex(
    (message) => message.role === "assistant"
  );

  const message = result.output[lastAssistantTextMessage] as
    | TextMessage
    | undefined;

  return message?.content
    ? typeof message.content === "string"
      ? message.content
      : message.content.map((c) => c.text).join("")
    : undefined;
}

export async function generateProjectTitle(text: string) {
  try {
    const titleGenerator = createAgent({
      name: "title-generator",
      description: "A title generator",
      system: TITLE_PROMPT,
      model: openai({ model: "gpt-4o-mini" }),
    });

    const { output: generatedTitle } = await titleGenerator.run(text);
    return parseAgentOutput(generatedTitle);
  } catch (error) {
    throw new Error("couldn't generate a title");
  }
}
