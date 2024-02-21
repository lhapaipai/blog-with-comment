import Link from "next/link";

export default function Header() {
  return (
    <header className="py-6">
      <nav className="flex space-x-4">
        <Link className="hover:text-gray-900" href="/">
          About
        </Link>
        <Link className="hover:text-gray-900" href="/posts">
          Posts
        </Link>
      </nav>
    </header>
  );
}
