"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type SocialPlatform = "twitter" | "github" | "linkedin" | "email";

type SocialCardProps = {
  platform: SocialPlatform;
  name: string;
  handle: string;
  profileImage: string;
  href: string;
  bio?: string;
  accentColor?: "blue" | "red";
};

const platformIcons: Record<SocialPlatform, React.ReactNode> = {
  twitter: (
    <svg
      className="h-4 w-4"
      fill="currentColor"
      viewBox="0 0 1200 1227"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>X</title>
      <path d="M714.163 519.284 1160.89 0h-105.86L667.137 450.887 357.328 0H0l468.492 681.821L0 1226.37h105.866l409.625-476.152 327.181 476.152H1200L714.137 519.284h.026ZM569.165 687.828l-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721H892.476L569.165 687.854v-.026Z" />
    </svg>
  ),
  github: (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  ),
  linkedin: (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  email: (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  ),
};

const platformLabels: Record<SocialPlatform, string> = {
  twitter: "X",
  github: "GitHub",
  linkedin: "LinkedIn",
  email: "Email",
};

function CardContent({
  platform,
  name,
  handle,
  profileImage,
  bio,
  accentColor,
  showCopied,
}: {
  platform: SocialPlatform;
  name: string;
  handle: string;
  profileImage: string;
  bio?: string;
  accentColor: "blue" | "red";
  showCopied?: boolean;
}) {
  const accentClass = accentColor === "blue" ? "text-violet-400" : "text-red-400";

  return (
    <div
      className={cn(
        "relative isolate w-full overflow-hidden rounded-2xl p-1",
        "bg-white/5",
        "bg-gradient-to-br from-white/5 to-white/[0.02]",
        "backdrop-blur-xl backdrop-saturate-[180%]",
        "border border-white/10",
        "shadow-[0_8px_16px_rgb(0_0_0_/_0.25)]",
        "translate-z-0 will-change-transform",
        "transition-all duration-300 hover:scale-[1.02] hover:border-white/20"
      )}
    >
      <div
        className={cn(
          "relative w-full rounded-xl p-4",
          "bg-gradient-to-br from-white/[0.08] to-transparent",
          "backdrop-blur-md backdrop-saturate-150",
          "border border-white/[0.08]",
          "text-white",
          "shadow-sm",
          "translate-z-0 will-change-transform",
          "before:pointer-events-none before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-br before:from-white/[0.03] before:to-white/[0.01] before:opacity-0 before:transition-opacity",
          "hover:before:opacity-100"
        )}
      >
        <div className="flex gap-3">
          <div className="shrink-0">
            <div className="h-10 w-10 overflow-hidden rounded-full ring-2 ring-white/10">
              <img alt={name} className="h-full w-full object-cover" src={profileImage} />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-white/90 truncate">{name}</span>
                </div>
                <span className="text-sm text-white/50 truncate">
                  {platform === "email" ? handle : `@${handle}`}
                </span>
              </div>
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg p-1",
                  "text-white/70 hover:bg-white/5 hover:text-white",
                  "transition-colors"
                )}
              >
                {platformIcons[platform]}
              </div>
            </div>
          </div>
        </div>

        {bio && <p className="mt-3 text-sm text-white/70 line-clamp-2">{bio}</p>}

        <div className="mt-3 flex items-center justify-between">
          <span className={cn("text-xs font-medium", accentClass)}>{platformLabels[platform]}</span>
          <span className="text-xs text-white/40">
            {platform === "email" ? "Tap to copy" : "View Profile →"}
          </span>
        </div>
      </div>

      {/* Toast notification for email copy */}
      {showCopied && (
        <div
          className={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50",
            "px-4 py-2 rounded-lg",
            "bg-black/90 border border-white/20",
            "text-white text-sm font-medium",
            "animate-in fade-in zoom-in duration-200"
          )}
        >
          Email copied!
        </div>
      )}
    </div>
  );
}

export default function SocialCard({
  platform,
  name,
  handle,
  profileImage,
  href,
  bio,
  accentColor = "blue",
}: SocialCardProps) {
  const [showCopied, setShowCopied] = useState(false);

  const handleEmailClick = async () => {
    try {
      await navigator.clipboard.writeText(handle);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = handle;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    }
  };

  if (platform === "email") {
    return (
      <button onClick={handleEmailClick} className="w-full text-left cursor-pointer">
        <CardContent
          platform={platform}
          name={name}
          handle={handle}
          profileImage={profileImage}
          bio={bio}
          accentColor={accentColor}
          showCopied={showCopied}
        />
      </button>
    );
  }

  return (
    <Link href={href} target="_blank" rel="noopener noreferrer">
      <CardContent
        platform={platform}
        name={name}
        handle={handle}
        profileImage={profileImage}
        bio={bio}
        accentColor={accentColor}
      />
    </Link>
  );
}
