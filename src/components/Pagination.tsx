import React from 'react';
import { Pagination as MuiPagination, PaginationItem, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  baseUrl?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  baseUrl,
}) => {
  const location = useLocation();

  // If baseUrl is not provided, use the current path
  const basePath = baseUrl || location.pathname;

  // Get existing query parameters
  const searchParams = new URLSearchParams(location.search);

  const handleChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    if (onPageChange) {
      onPageChange(page);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
      <MuiPagination
        page={currentPage}
        count={totalPages}
        onChange={handleChange}
        color="primary"
        size="large"
        siblingCount={1}
        boundaryCount={1}
        renderItem={(item) => {
            // Если item.page есть, собираем ссылку, иначе остаёмся на текущем URL
            const pageSearchParams = new URLSearchParams(searchParams);

            if (item.page !== null) {
                pageSearchParams.set("page", item.page.toString());
            }

            const to =
                item.page !== null
                    ? `${basePath}?${pageSearchParams.toString()}`
                    : location.pathname + location.search;

            return <PaginationItem component={Link} to={to} {...item} />;
        }}
      />
    </Box>
  );
};

export default Pagination;