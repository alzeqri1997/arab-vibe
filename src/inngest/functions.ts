// run this command in the terminal to open up inngest cli : npx inngest-cli@latest dev
import { createAgent, openai } from "@inngest/agent-kit"
import Sandbox from "@e2b/code-interpreter"

import { inngest } from "./client"
import { getSandbox } from "./utils"

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    const sandboxId = await step.run("get-sandbox-id", async () => {
      const sandboxId = await Sandbox.create("yjwnm2zu3bj6qbkbck3z")

      return sandboxId.sandboxId
    })

    const codeAgent = createAgent({
      name: "code-agent",
      system:
        "You are an expert next.js developer. You write readable, maintainable code. You write simple Next.js & React snippets.",
      model: openai({ model: "gpt-4o" }),
    })

    const { output } = await codeAgent.run(
      `Write the following snippet: ${event.data.email}`
    )

    const sandboxUrl = await step.run("get-sandbox-url", async () => {
      const sandbox = await getSandbox(sandboxId)
      const host = sandbox.getHost(3000)

      return `https://${host}`
    })

    return { output, sandboxUrl }
  }
)
