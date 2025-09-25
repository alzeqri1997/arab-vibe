interface Props {
  children: React.ReactNode;
}

const layout = ({ children }: Props) => {
  return (
    <main className="flex flex-col main-h-screen">
      <div
        className="absolute inset-0 -z-10 h-full w-full bg-background dark:bg-[radial-gradient(#393e4e_1px,transparent_1px)] 
      bg-[radial-gradient(#d4d4d8_1px,transparent_1px)]
      [background-size:16px_16px]
      "
      />
      <div className="flex-1 flex flex-col px-4 pb-4">{children}</div>
    </main>
  );
};

export default layout;
