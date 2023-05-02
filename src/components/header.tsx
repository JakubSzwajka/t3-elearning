import Link from "next/link";

const Header = () => {
  return (
    <div className="top-0 mt-auto w-full bg-gray-800 p-4">
      <Link href="/" className="text-lg font-bold text-white">
        MyApp
      </Link>
    </div>
  );
};

export default Header;
