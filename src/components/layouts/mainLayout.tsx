import React from "react";
import { signOut } from "next-auth/react";
import Footer from "../footer";
import Header from "../header";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="sticky top-0 w-64 bg-white shadow-md">
        <nav className="flex h-full flex-col justify-between">
          <ul className="py-4">
            <li>
              <a href="/home" className="block px-4 py-2 hover:bg-gray-200">
                Home
              </a>
            </li>
            {/* Add more menu items here */}
          </ul>
          <button
            className="block px-4 py-2 hover:bg-gray-200"
            onClick={() => void signOut()}
          >
            Logout
          </button>
        </nav>
      </aside>
      <div className="flex min-h-screen flex-grow flex-col">
        <Header />
        <main className="container mx-auto flex-grow">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
