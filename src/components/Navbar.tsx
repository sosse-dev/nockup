import Image from "next/image";
import Link from "next/link";
import MobileNav from "./MobileNav";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <nav className="flex-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/icons/logo.svg"
          width={32}
          height={32}
          alt="Nockup Logo"
          className="max-sm:size-10"
        />
        <p className="text-[26px] font-extrabold text-blue-500 max-sm:hidden">
          NOCK<span className="text-red-500">UP</span>
        </p>
      </Link>

      <div className="flex-between gap-5">
        <SignedIn>
          <UserButton />
        </SignedIn>

        <SignedOut>
          {/* <SignedInButton /> */}
        </SignedOut>

        <MobileNav />
      </div>
    </nav>
  );
}
