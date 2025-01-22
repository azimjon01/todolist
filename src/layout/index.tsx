import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="w-[100vw] flex flex-col md:w-[650px] h-[80vh] md:bg-[#3A4750] p-7 rounded-lg">
      {children}
    </div>
  );
};

export default Layout;
