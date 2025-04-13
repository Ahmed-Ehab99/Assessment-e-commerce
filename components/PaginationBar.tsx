"use client";

import { cn } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationBarProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function PaginationBar({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationBarProps) {
  const { i18n } = useTranslation();
  const direction = i18n.dir();
  const isRTL = direction === "rtl";

  return (
    <Pagination>
      <PaginationContent className={cn(isRTL && "flex-row-reverse", "gap-10")}>
        <PaginationItem>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={cn(
              "flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary",
              currentPage === 1 && "pointer-events-none opacity-50",
            )}
          >
            {isRTL ? (
              <>
                <span>التالي</span>
                <ChevronLeft size={18} />
              </>
            ) : (
              <>
                <ChevronLeft size={18} />
                <span>Previous</span>
              </>
            )}
          </button>
        </PaginationItem>

        {Array.from({ length: totalPages }).map((_, i) => {
          const page = i + 1;
          const isEdgePage = page === 1 || page === totalPages;
          const isNearCurrentPage = Math.abs(page - currentPage) <= 2;

          if (!isEdgePage && !isNearCurrentPage) {
            if (i === 1 || i === totalPages - 2) {
              return (
                <PaginationItem
                  key={`ellipsis-${i}`}
                  className="hidden md:block"
                >
                  <PaginationEllipsis className="text-muted-foreground" />
                </PaginationItem>
              );
            }
            return null;
          }

          return (
            <PaginationItem key={page} className="hidden md:block">
              <PaginationLink
                href="#"
                isActive={page === currentPage}
                onClick={() => onPageChange(page)}
                className={cn(page === currentPage && "pointer-events-none")}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className={cn(
              "flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary",
              currentPage >= totalPages && "pointer-events-none opacity-50",
            )}
          >
            {isRTL ? (
              <>
                <ChevronRight size={18} />
                <span>السابق</span>
              </>
            ) : (
              <>
                <span>Next</span>
                <ChevronRight size={18} />
              </>
            )}
          </button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
