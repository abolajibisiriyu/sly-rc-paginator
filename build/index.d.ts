declare module "sly-rc-paginator" {
  import React from "react";

  export interface PaginatorProps {
    meta: {
      totalItems: number;
      currentPage: number;
      itemsPerPage: number;
    };
    options: {
      ulClassName: string;
      liClassName: string;
      activeClassName: string;
      disabledClassName: string;
      anchorClassName?: string;
    };
    onPageChange: (page: number) => void;
    prevComponent?: JSX.Element | string | null;
    nextComponent?: JSX.Element | string | null;
    firstComponent?: JSX.Element | string | null;
    lastComponent?: JSX.Element | string | null;
    showFirst?: boolean;
    showLast?: boolean;
  }

  const Paginator: React.SFC<PaginatorProps>;
  export default Paginator;
}
