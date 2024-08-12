"use client";

import { Button } from "@/components/ui/button";
import { useLogoutMutation } from "@/store/queries/auth/useLogoutMutation";
import Image from "next/image";
import Link from "next/link";

function SidebarContainer() {
  const { logoutMutation } = useLogoutMutation();

  const handleLogout = async () => {
    await logoutMutation();
  };

  return (
    <aside className="fixed top-0 left-0 z-40 w-64 h-screen flex flex-col justify-between transform -translate-x-full sm:translate-x-0 transition-transform">
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 flex flex-col">
        <div className="flex justify-center mt-8 mb-16">
          <Link href="/">
            <Image src="/logo.png" width={132} height={24} alt="ZZAN logo" />
          </Link>
        </div>
        <ul className="space-y-2 font-medium flex-1">
          <li>
            <Link
              href="/"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <span className="ml-3">대시보드</span>
            </Link>
          </li>
          <li>
            <Link
              href="/quiz"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <span className="ml-3">퀴즈 관리 페이지</span>
            </Link>
          </li>
          <li>
            <Link
              href="/claim"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <span className="ml-3">기프티콘 신청 관리 페이지</span>
            </Link>
          </li>
          <li>
            <Link
              href="/gift"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <span className="ml-3">기프티콘 상품 관리 페이지</span>
            </Link>
          </li>
          <li>
            <Link
              href="/user"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <span className="ml-3">유저 관리 페이지</span>
            </Link>
          </li>
          <li>
            <Link
              href="/vote"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <span className="ml-3">짠 소비 게시글 관리 페이지</span>
            </Link>
          </li>
          <li>
            <Link
              href="/knowhow"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <span className="ml-3">짠 노하우 게시글 관리 페이지</span>
            </Link>
          </li>
          <li>
            <Link
              href="/comment"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <span className="ml-3">댓글 관리 페이지</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="px-3 py-4 bg-gray-50 dark:bg-gray-800 flex justify-center">
        <Button
          onClick={handleLogout}
          className="flex items-center text-gray-900 rounded-lg dark:text-white underline"
          variant="link"
        >
          <span className="ml-3">로그아웃</span>
        </Button>
      </div>
    </aside>
  );
}

export default SidebarContainer;
