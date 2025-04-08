"use client"

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function LayoutHeader() {
  const { data: session } = useSession();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <header className="flex justify-between items-center p-4 text-white bg-gray-800">
      {/* Logo */}
      <Link href="/" className="text-xl font-bold">
        KDramaQoutes
      </Link>

      {/* Auth Section */}
      <div className="flex items-center" ref={dropdownRef}>
        {session ? (
          <>
            {/* Clickable Avatar */}
            <button onClick={() => setDropdownOpen(!isDropdownOpen)}>
              {session.user?.image ? (
                <Image
                  src={session.user.image}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full cursor-pointer"
                />
              ) : (
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-700 text-white font-bold cursor-pointer">
                  {session.user?.displayName?.charAt(0).toUpperCase() || "?"}
                </div>
              )}            </button>
            {/* Dropdown */}
            {isDropdownOpen && (
              <div className="absolute right-3 top-15 bg-white text-black rounded-lg shadow-lg">
                <ul className="py-2">
                  <li>
                    <Link
                      href="/settings"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Settings
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => signOut()}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </>
        ) : (
          <>
            <div>
              <Link href="/signup">JOIN</Link>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
