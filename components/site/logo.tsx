import Link from "next/link";
import Image from "next/image";

export function Logo({ size = 32 }: { size?: number }) {
  return (
    <Link
      href="/"
      className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
    >
      <Image
        src="/fwstudios-logo-white.png"
        alt="FWStudios"
        width={size}
        height={size}
        priority
        className="rounded-md"
      />
      <span className="font-display text-[15px] font-semibold tracking-tight text-fg">
        FWStudios
      </span>
    </Link>
  );
}
