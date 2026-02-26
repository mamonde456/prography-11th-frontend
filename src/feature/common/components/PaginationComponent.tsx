import { cn } from "../../lib/utils";

type Props = {
  pages: number[];
  currentPage: number;
  updatePageCount: (page: number) => void;
};

export default function PaginationComponent({
  pages,
  currentPage,
  updatePageCount,
}: Props) {
  return (
    <nav className="w-full p-5 pb-2 mt-5">
      <ul className="flex justify-center gap-2">
        {pages.map((page: number) => (
          <li
            className={cn(currentPage === page && "text-red-400")}
            key={page}
            onClick={() => updatePageCount(page)}
          >
            {page}
          </li>
        ))}
      </ul>
    </nav>
  );
}
