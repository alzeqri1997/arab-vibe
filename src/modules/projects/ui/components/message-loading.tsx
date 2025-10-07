import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";

const ShimmerMessages = () => {
  const t = useTranslations("project.message-container.shimmer-messages");
  const messages = [
    t("thinking"),
    t("loading"),
    t("generating"),
    t("analyzing-your-request"),
    t("building-your-website"),
    t("crafting-components"),
    t("optimizing-final-touches"),
    t("adding-final-touches"),
    t("almost-ready"),
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 2000); // Change message every 2 seconds

    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="flex items-center gap-2">
      <span className="text-base text-muted-foreground animate-pulse">
        {messages[currentMessageIndex]}
      </span>
    </div>
  );
};

const MessageLoading = () => {
  return (
    <div className="flex flex-col group px-2 pb-4">
      <div className="flex items-center gap-2 pl-2 mb-2">
        <Image
          src="/logo.svg"
          alt="Arab-Vibe"
          width={18}
          height={18}
          className="shrink-0"
        />
        <span className="text-sm font-medium">Vibe</span>
      </div>
      <div className="pl-8.5 flex flex-col gap-y-4">
        <ShimmerMessages />
      </div>
    </div>
  );
};

export default MessageLoading;
