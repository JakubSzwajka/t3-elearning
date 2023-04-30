import React from "react";

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto">{children}</main>
    </div>
  );
};

export default LoginLayout;
