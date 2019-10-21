import React, { Component } from "react";
import isEmpty from "lodash/isEmpty";
import isEqual from "lodash/isEqual";
import PropTypes from "prop-types";

import { getPager } from "./helpers";
class Paginator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pager: {}
    };
  }

  componentDidMount() {
    const {
      meta,
      meta: { totalItems, currentPage, itemsPerPage }
    } = this.props;

    !isEmpty(meta) &&
      this.setState({
        pager: getPager(totalItems, currentPage, itemsPerPage)
      });
  }

  componentDidUpdate(prevProps) {
    const {
      meta,
      meta: { totalItems, currentPage, itemsPerPage }
    } = this.props;

    if (!isEqual(meta, prevProps.meta)) {
      !isEmpty(meta) &&
        this.setState({
          pager: getPager(totalItems, currentPage, itemsPerPage)
        });
    }
  }

  render() {
    const { pager } = this.state;
    const {
      options,
      prevComponent,
      nextComponent,
      firstComponent,
      lastComponent,
      showFirst = true,
      showLast = true
    } = this.props;
    // console.log(pager);
    return (
      !isEmpty(pager) && (
        <ul className={options.ulClassName || ""}>
          {showFirst && (
            <li
              className={`${options.liClassName || ""} ${
                pager.currentPage === 1 ? options.disabledClassName : ""
              }`}
            >
              <a
                className={options.anchorClassName || ""}
                onClick={() =>
                  pager.currentPage !== 1 && this.props.onPageChange(1)
                }
              >
                {firstComponent ? firstComponent : "First"}
              </a>
            </li>
          )}
          <li
            className={`${options.liClassName || ""} ${
              pager.currentPage === 1 ? options.disabledClassName : ""
            }`}
          >
            <a
              className={options.anchorClassName || ""}
              onClick={() =>
                pager.currentPage > 1 &&
                this.props.onPageChange(pager.currentPage - 1)
              }
            >
              {prevComponent ? prevComponent : "Previous"}
            </a>
          </li>
          {pager.pages &&
            pager.pages.map((page, index) => (
              <li
                key={index}
                className={`${options.liClassName || ""} ${
                  pager.currentPage === page ? options.activeClassName : ""
                }`}
              >
                <a
                  className={options.anchorClassName || ""}
                  onClick={() =>
                    page !== this.props.meta.currentPage &&
                    this.props.onPageChange(page)
                  }
                >
                  {page}
                </a>
              </li>
            ))}
          <li
            className={`${options.liClassName || ""} ${
              pager.currentPage === pager.numberOfPages
                ? options.disabledClassName
                : ""
            }`}
          >
            <a
              className={options.anchorClassName || ""}
              onClick={() =>
                pager.currentPage < pager.numberOfPages &&
                this.props.onPageChange(pager.currentPage + 1)
              }
            >
              {nextComponent ? nextComponent : "Next"}
            </a>
          </li>
          {showLast && (
            <li
              className={`${options.liClassName || ""} ${
                pager.currentPage === pager.numberOfPages
                  ? options.disabledClassName
                  : ""
              }`}
            >
              <a
                className={options.anchorClassName || ""}
                onClick={() =>
                  pager.currentPage !== pager.numberOfPages &&
                  this.props.onPageChange(pager.numberOfPages)
                }
              >
                {lastComponent ? lastComponent : "Last"}
              </a>
            </li>
          )}
        </ul>
      )
    );
  }
}

Paginator.propTypes = {
  meta: PropTypes.shape({
    totalItems: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number.isRequired
  }).isRequired,
  options: PropTypes.shape({
    ulClassName: PropTypes.string.isRequired,
    liClassName: PropTypes.string.isRequired,
    activeClassName: PropTypes.string.isRequired,
    disabledClassName: PropTypes.string.isRequired,
    anchorClassName: PropTypes.string
  }).isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Paginator;
