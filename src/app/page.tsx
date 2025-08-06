import { caller } from "@/trpc/server";

export default async function Home() {
  const data = await caller.createAPI({ text: 'Ahmed From Server Component'})
  return (
    <div>
      {JSON.stringify(data)}
    </div>
  );
}
