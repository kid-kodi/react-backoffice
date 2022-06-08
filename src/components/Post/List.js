export default function List({ children }) {
  return (
    <ul className="bg-white space-y-4 p-4 sm:px-8 sm:py-6 lg:p-4 xl:px-8 xl:py-6 divide-y divide-slate-100">
      {children}
    </ul>
  );
}
