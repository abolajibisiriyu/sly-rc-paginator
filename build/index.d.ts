declare module "sly-rc-paginator" {
  import React from "react";

  export interface PaginatorProps {
    options: {
      totalItems: number;
      currentPage: number;
      itemsPerPage: number;
    };
    prevComponent: Function | string;
    nextComponent: Function | string;
    firstComponent: Function | string;
    lastComponent: Function | string;
    showFirst: boolean;
    showLast: boolean;
  }

  const Paginator: React.SFC<PaginatorProps>;
  export default Paginator;
}
