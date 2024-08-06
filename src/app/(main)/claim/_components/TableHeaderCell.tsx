function TableHeaderCell({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">{children}</th>
  );
}

export default TableHeaderCell;
