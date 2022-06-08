export default function Nav({ children }) {
  return (
    <nav className="bg-white space-y-4 p-4 sm:px-8 sm:py-6 lg:p-4 xl:px-8 xl:py-6 text-sm font-medium">
      <ul className="flex space-x-3 overflow-hidden">{children}</ul>
    </nav>
  );
}
