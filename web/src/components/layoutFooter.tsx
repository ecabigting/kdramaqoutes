// components/LayoutFooter.tsx
import Link from "next/link";
import { GithubIcon, FacebookIcon, XIcon } from "lucide-react";
import Image from "next/image";

export default function LayoutFooter() {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* About Column */}
          <div className="space-y-2">
            <h3 className="text-purple-400 font-bold mb-4">About</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-purple-500 transition-colors">About Us</Link></li>
              {/* <li><Link href="/blog" className="hover:text-purple-500 transition-colors">Blog</Link></li> */}
              <li><Link href="/contact" className="hover:text-purple-500 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="space-y-2">
            <h3 className="text-purple-400 font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/terms" className="hover:text-purple-500 transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-purple-500 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/dmca" className="hover:text-purple-500 transition-colors">DMCA</Link></li>
            </ul>
          </div>

          {/* Learn Column */}
          {/* <div className="space-y-2"> */}
          {/*   <h3 className="text-purple-400 font-bold mb-4">Learn</h3> */}
          {/*   <ul className="space-y-2"> */}
          {/*     <li><Link href="/docs" className="hover:text-purple-500 transition-colors">Documentation</Link></li> */}
          {/*     <li><Link href="/guide" className="hover:text-purple-500 transition-colors">User Guide</Link></li> */}
          {/*     <li><Link href="/api" className="hover:text-purple-500 transition-colors">API Reference</Link></li> */}
          {/*   </ul> */}
          {/* </div> */}

          {/* Social Column */}
          <div className="space-y-2">
            <h3 className="text-purple-400 font-bold mb-4">Social</h3>
            <div className="flex space-x-4">
              <Link href="https://github.com/ecabigting/kdramaqoutes" className="hover:text-purple-500 transition-colors">
                <GithubIcon className="w-6 h-6" />
              </Link>
              <Link href="https://twitter.com" className="hover:text-purple-500 transition-colors">
                <XIcon className="w-6 h-6" />
              </Link>
              <Link href="https://facebook.com" className="hover:text-purple-500 transition-colors">
                <FacebookIcon className="w-6 h-6" />
              </Link>
            </div>
            <div className="mt-4">
              <Link href="https://thetvdb.com/">
                <Image
                  src="/thetvdb-logo.png"
                  alt="TVDB Logo"
                  width={100}
                  height={40}
                  className="hover:opacity-75 transition-opacity"
                />
              </Link>

            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} KDramaQoutes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
