import SidebarContainer from "@/app/(main)/_components/SidebarContainer";
import { ReactNode } from "react";

function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <div className="w-64 h-screen bg-gray-800">
        <SidebarContainer />
      </div>
      <main className="flex-1 h-full">{children}</main>
    </div>
  );
}

export default MainLayout;
