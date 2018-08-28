import React, { Component } from "react";

import classnames from "../classnames";

const Spacer = () => <span className="chq-pag--sp">...</span>;

class PageLink extends Component {
  handleClick = () => {
    const { page, isActive, onClick } = this.props;

    if (!isActive) {
      onClick(page);
    }
  };

  render() {
    const { disabled, children, isActive } = this.props;

    const className = classnames("chq-pag--bn", {
      "chq-pag--bn-ac": isActive
    });

    return (
      <button
        type="button"
        disabled={disabled}
        className={className}
        onClick={this.handleClick}
      >
        {children}
      </button>
    );
  }
}

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

const Pagination = ({
  className,
  currentPage: current,
  totalPages: total,
  onClick
}) => {
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
        <Page key={page} page={page} isActive={page === current} onClick={onClick} />
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
