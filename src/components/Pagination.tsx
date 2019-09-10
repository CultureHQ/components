import * as React from "react";

import classnames from "../classnames";

const Spacer = () => <span aria-hidden="true" className="chq-pag--sp">...</span>;

type PageOnClick = (page: number) => void;
type PageLinkProps = {
  disabled?: boolean;
  children: React.ReactNode;
  current?: boolean;
  onClick: PageOnClick;
  page: number;
};

const PageLink = ({ disabled, children, current, onClick, page }: PageLinkProps) => {
  const onButtonClick = () => {
    if (!current) {
      onClick(page);
    }
  };

  return (
    <button
      type="button"
      disabled={disabled}
      aria-current={current}
      className="chq-pag--bn"
      onClick={onButtonClick}
    >
      {children}
    </button>
  );
};

type PageProps = Omit<PageLinkProps, "children">;

const Page = ({ page, ...props }: PageProps) => (
  <PageLink page={page} {...props}>{page}</PageLink>
);

type PrevPageProps = {
  currentPage: number;
  onClick: PageOnClick;
};

const PrevPage = ({ currentPage, onClick }: PrevPageProps) => (
  <PageLink
    disabled={currentPage === 1}
    page={currentPage - 1}
    onClick={onClick}
  >
    &laquo;
  </PageLink>
);

type NextPageProps = {
  currentPage: number;
  onClick: PageOnClick;
  totalPages: number;
};

const NextPage = ({ currentPage, totalPages, onClick }: NextPageProps) => (
  <PageLink
    disabled={currentPage === totalPages}
    page={currentPage + 1}
    onClick={onClick}
  >
    &raquo;
  </PageLink>
);

type PaginationProps = {
  className?: string;
  currentPage: number;
  onClick: PageOnClick;
  totalPages: number;
};

const Pagination = ({ className, currentPage = 1, totalPages, onClick }: PaginationProps) => {
  if (totalPages < 2) {
    return null;
  }

  const innerWindow = (
    [...Array(5)].map((empty, index) => index + currentPage - 2)
      .filter(page => page >= 1 && page <= totalPages)
  );

  return (
    <nav className={classnames("chq-pag", className)}>
      <PrevPage currentPage={currentPage} onClick={onClick} />
      {currentPage > 3 && <Page page={1} onClick={onClick} />}
      {currentPage > 4 && (
        currentPage === 5 ? <Page page={2} onClick={onClick} /> : <Spacer />
      )}
      {innerWindow.map(page => (
        <Page key={page} page={page} current={page === currentPage} onClick={onClick} />
      ))}
      {currentPage < totalPages - 3 && (
        currentPage === totalPages - 4
          ? <Page page={totalPages - 1} onClick={onClick} />
          : <Spacer />
      )}
      {currentPage < totalPages - 2 && <Page page={totalPages} onClick={onClick} />}
      <NextPage currentPage={currentPage} totalPages={totalPages} onClick={onClick} />
    </nav>
  );
};

export default Pagination;
