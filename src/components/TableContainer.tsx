"use client";

import { useState } from "react";
import PaginationContainer from "@/components/PaginationContainer";
import TableHeaderCell from "@/app/(main)/claim/_components/TableHeaderCell";

type TableContainerProps<T> = {
  useQuery: (
    page: number,
    limit: number
  ) => { data: { data: T[]; totalPages: number } | undefined; isPending: boolean };
  renderRow: (item: T) => React.ReactNode;
  headers: string[];
  pageLimit: number;
};

function TableContainer<T>({ useQuery, renderRow, headers, pageLimit }: TableContainerProps<T>) {
  const [page, setPage] = useState<number>(1);
  const { data, isPending } = useQuery(page, pageLimit);

  const handlePageChange = (newPage: number) => setPage(newPage);

  return (
    <>
      {isPending ? (
        <p>Loading...</p>
      ) : (
        data && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {headers.map((header) => (
                    <TableHeaderCell key={header}>{header}</TableHeaderCell>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">{data.data.map(renderRow)}</tbody>
            </table>
          </div>
        )
      )}
      <PaginationContainer currentPage={page} onPageChange={handlePageChange} totalPages={data?.totalPages || 1} />
    </>
  );
}

export default TableContainer;
