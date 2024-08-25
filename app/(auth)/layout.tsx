import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-screen-sm mx-auto py-28 bg-green-400 min-h-screen">
      {children}
    </div>
  );
};

export default AuthLayout;
