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

const Pagination = ({ className, currentPage: current = 1, totalPages: total, onClick }: PaginationProps) => {
  if (total < 2) {
    return null;
  }

  const innerWindow = (
    [...Array(5)].map((empty, index) => index + current - 2)
      .filter(page => page >= 1 && page <= total)
  );

  return (
    <nav className={classnames("chq-pag", className)}>
      <PrevPage currentPage={current} onClick={onClick} />
      {current > 3 && <Page page={1} onClick={onClick} />}
      {current > 4 && (
        current === 5 ? <Page page={2} onClick={onClick} /> : <Spacer />
      )}
      {innerWindow.map(page => (
        <Page key={page} page={page} current={page === current} onClick={onClick} />
      ))}
      {current < total - 3 && (
        current === total - 4 ? <Page page={total - 1} onClick={onClick} /> : <Spacer />
      )}
      {current < total - 2 && <Page page={total} onClick={onClick} />}
      <NextPage currentPage={current} totalPages={total} onClick={onClick} />
    </nav>
  );
};

export default Pagination;
