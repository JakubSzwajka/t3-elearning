import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/" className="text-lg font-bold text-white">
            MyApp
          </Link>
        </div>
        <div className="space-x-4">
          <Link href="/users" className="text-white">
            Users
          </Link>
          <Link href="/lessons" className="text-white">
            Lessons
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
