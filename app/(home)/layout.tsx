import NavHeader from "@/components/nav-header";
import React from "react";

const NavLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-screen-sm mx-auto bg-green-400 min-h-screen">
      <NavHeader />
      <div className="pt-12">{children}</div>
    </div>
  );
};

export default NavLayout;
