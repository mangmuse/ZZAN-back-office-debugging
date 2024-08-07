import { ReactNode } from "react";

function MainLayout({ children }: { children: ReactNode }) {
  return <main className="flex flex-col items-center">{children}</main>;
}

export default MainLayout;
