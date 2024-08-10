import { ReactNode } from "react";

function MainLayout({ children }: { children: ReactNode }) {
  return <main className="flex flex-col h-full items-center">{children}</main>;
}

export default MainLayout;
