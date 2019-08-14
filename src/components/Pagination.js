import React from "react";

import classnames from "../classnames";

const Spacer = () => <span aria-hidden="true" className="chq-pag--sp">...</span>;

const PageLink = ({ disabled, children, current, onClick, page }) => {
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

const Page = ({ page, ...props }) => (
  <PageLink page={page} {...props}>{page}</PageLink>
);

const PrevPage = ({ currentPage, onClick }) => (
  <PageLink
    disabled={currentPage === 1}
    page={currentPage - 1}
    onClick={onClick}
  >
    &laquo;
  </PageLink>
);

const NextPage = ({ currentPage, totalPages, onClick }) => (
  <PageLink
    disabled={currentPage === totalPages}
    page={currentPage + 1}
    onClick={onClick}
  >
    &raquo;
  </PageLink>
);

const Pagination = ({ className, currentPage: current = 1, totalPages: total, onClick }) => {
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
