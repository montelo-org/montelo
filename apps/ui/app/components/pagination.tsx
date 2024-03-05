import { DoubleArrowLeftIcon, DoubleArrowRightIcon, ChevronLeftIcon, ChevronRightIcon, TrackNextIcon, TrackPreviousIcon } from "@radix-ui/react-icons";
import { Link } from "@remix-run/react";
import { Button } from "./ui/button";
import { ReactNode } from "react";

type PageLinkProps = {
  page: number;
  pageText: ReactNode;
  variant?: "outline" | "ghost";
  disabled?: boolean;
  isActive?: boolean;
};
const PageLink = ({ page, pageText, variant = "ghost", disabled = false, isActive = false }: PageLinkProps) => {
  const pageLinkComponent = (
    <Button
      variant={variant}
      size="sm"
      className={isActive ? "bg-muted" : ""}
      disabled={disabled}
    >
      {pageText || page}
    </Button>
  );

  return disabled ? pageLinkComponent
    : <Link to={`?page=${page}`} prefetch="intent">{pageLinkComponent}</Link>;
}

type PaginationProps = {
  currentPage: number;
  totalPages: number;
};
export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const showStartingEllipsis = currentPage >= 3;
  const showEndingEllipsis = currentPage <= totalPages - 2;

  const lowerBound = Math.max(0, currentPage === totalPages ? totalPages - 3 : currentPage - 2);
  const upperBound = Math.min(totalPages, currentPage === 1 ? 3 : currentPage + 1);
  const visiblePageNumbers = pageNumbers.slice(lowerBound, upperBound);

  const firstPage = pageNumbers[0];
  const lastPage = pageNumbers[pageNumbers.length - 1];

  const hasPreviousPages = currentPage > 1;
  const hasNextPages = currentPage < totalPages;

  return (
    <div className="flex items-center gap-1">
      <PageLink
        variant="outline"
        page={firstPage}
        pageText={<DoubleArrowLeftIcon />}
        disabled={!hasPreviousPages}
      />

      <PageLink
        variant="outline"
        page={currentPage - 1}
        pageText={<ChevronLeftIcon />}
        disabled={!hasPreviousPages}
      />

      {showStartingEllipsis && <span className="text-gray-500 -mr-1 ml-1">...</span>}
      {visiblePageNumbers.map((page) => (
        <PageLink
          key={page}
          page={page}
          pageText={page}
          isActive={currentPage === page}
        />
      ))}
      {showEndingEllipsis && <span className="text-gray-500 -ml-1 mr-1">...</span>}

      <PageLink
        variant="outline"
        page={currentPage + 1}
        pageText={<ChevronRightIcon />}
        disabled={!hasNextPages}
      />

      <PageLink
        variant="outline"
        page={lastPage}
        pageText={<DoubleArrowRightIcon />}
        disabled={!hasNextPages}
      />
    </div>
  );
}
