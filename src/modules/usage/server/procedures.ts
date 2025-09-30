import { getUsageStatus } from "@/lib/usage";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

export const usageRouter = createTRPCRouter({
  status: protectedProcedure.query(async () => {
    try {
      const result = await getUsageStatus();
      return result;
    } catch {
      throw new Error("Couldn't get Usage Status, try again later");
    }
  }),
});
